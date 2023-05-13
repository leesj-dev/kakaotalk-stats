import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AttachedFileList from "../molecules/AttachedFileList";
import RadiusButton from "../atoms/Button";
import ScrollIndicator from "../molecules/ScrollIndicator";
import FileDrop from "../organisms/FileDrop";
import {
  AnalyzedMessage,
  Chatroom,
  FileObject,
  MessageInfo,
  OriginMessageData,
} from "../../@types/index.d";
import { breakdownTxtFile, readAsDataURL } from "../../module/core/breakdownTxtFile";
import { getMessageData } from "../../module/core/getMessageData";
import { useDispatch } from "react-redux";
import { setAnalyzedMessages } from "../../store/reducer/messageSlice";

const AttachmentSectionBox = styled.div`
  padding: 80px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 1200px;

  > * + * {
    margin-top: 30px; /* 첫 번째 자식 컴포넌트를 제외한 나머지 자식 컴포넌트에 적용될 간격 */
  }

  > :last-child {
    margin-bottom: 50px; /* 마지막 자식 컴포넌트에만 적용될 간격 */
  }
`;

/**
 * 텍스트 파일을 메시지 데이터로 디코딩합니다.
 * @param {any[]} attachedFiles - 첨부된 파일 배열
 * @returns {Promise<any[]>} - 디코딩된 메시지 데이터 배열을 포함하는 프로미스 객체
 */
const decodeTxtFileIntoMessageData = async (attachedFiles: any[]) => {
  const analyzedMessages: MessageInfo[][] = [];
  for (const fileGroup of attachedFiles) {
    const filteredMessages: OriginMessageData[][] = await Promise.all(
      fileGroup.map(async (file: File) => {
        const base64 = await readAsDataURL(file);
        // 여기서 분기점
        return base64 && breakdownTxtFile(base64);
      })
    );
    const messageData = getMessageData(filteredMessages.flat());
    analyzedMessages.push([...messageData]);
  }
  return analyzedMessages;
};

/**
 * 메시지 데이터를 테이블 형태로 변환합니다.
 * @param {any[]} analyzedMessages - 분석된 메시지 데이터 배열
 * @returns {AnalyzedMessage[][][]} - 테이블 형태로 변환된 분석된 메시지 데이터
 */
const transformIntoTableForm = (analyzedMessages: any[]) => {
  const analyzedMessageData: AnalyzedMessage[][][] = analyzedMessages.map((chatRooms: Chatroom[]) => {
    return chatRooms.map((chatRoom: Chatroom) => {
      const { speaker, dates } = chatRoom;
      return dates.map((date: MessageInfo) => {
        return {
          speaker: speaker,
          date: date.date,
          chatTimes: date.data.chatTimes,
          keywordCounts: date.data.keywordCounts,
          replyTime: date.data.replyTime,
        };
      });
    });
  });
  return analyzedMessageData;
};

/**
 * 메시지를 분석합니다.
 * @param {any[]} attachedFiles - 첨부된 파일 배열
 * @returns {Promise<AnalyzedMessage[][][]>} - 분석된 메시지 데이터 배열을 포함하는 프로미스 객체
 */
const analyzeMessage = async (attachedFiles: FileObject[][]) => {
  const analyzedMessages: MessageInfo[][] = await decodeTxtFileIntoMessageData(attachedFiles);
  const analyzedMessageData: AnalyzedMessage[][][] = transformIntoTableForm(analyzedMessages);
  return analyzedMessageData;
};

const AttachmentSection = () => {
  const dispatch = useDispatch();

  const [attachedFiles, setAttachedFiles] = useState<FileObject[][]>([]);

  const pushNewlyAttachedFiles = (files: any[]) => {
    if (attachedFiles.length) {
      return setAttachedFiles([...attachedFiles, [...files]]);
    }
    setAttachedFiles([[...files]]);
  };

  const deleteAttachedFileArray = (fileArrayIndex: number) => {
    const filteredFileList = [...attachedFiles].filter((_, index) => index !== fileArrayIndex);
    setAttachedFiles(filteredFileList);
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = event.target.files;
    if (files && files.length) {
      pushNewlyAttachedFiles(Array.prototype.slice.call(files));
    }
  };

  const dispatchAnalyzedMessages = async (attachedFiles: FileObject[][]) => {
    try {
      const analyzedMessage: AnalyzedMessage[][][] = await analyzeMessage(attachedFiles);
      dispatch(setAnalyzedMessages(analyzedMessage));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(attachedFiles);
  }, [attachedFiles]);

  return (
    <AttachmentSectionBox>
      <FileDrop
        pushNewlyAttachedFiles={pushNewlyAttachedFiles}
        handleChangeFile={handleChangeFile}
      ></FileDrop>
      <AttachedFileList
        attachedFiles={attachedFiles}
        deleteAttachedFileArray={deleteAttachedFileArray}
      ></AttachedFileList>
      <RadiusButton
        onClick={() => dispatchAnalyzedMessages(attachedFiles)}
        disabled={!attachedFiles.length}
      >
        분석하기
      </RadiusButton>
      <ScrollIndicator onClick={() => console.log("스크롤다운된다아ㅏㅏㅏ")}>
        카카오톡 메시지 내보내기 방법은?
      </ScrollIndicator>
    </AttachmentSectionBox>
  );
};

export default AttachmentSection;
