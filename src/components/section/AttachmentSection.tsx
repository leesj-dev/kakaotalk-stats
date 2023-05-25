import React, { useEffect, useRef, useState } from "react";
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

import {
  breakdownTxtFileAndroid,
  breakdownTxtFileIOS,
  breakdownTxtFileMacOS,
  breakdownTxtFileWindow,
  readAsDataURL,
} from "../../module/core/breakdownTxtFile";
import { getMessageData } from "../../module/core/getMessageData";
import { useDispatch } from "react-redux";
import { setAnalyzedMessages } from "../../store/reducer/analyzedMessagesSlice";
import Span from "../atoms/Span";
import { useNavigate } from "react-router";
import scrollToEvent from "../../module/common/scrollEvent";
import OsList from "../organisms/OsList";
import { setIsAnalyzedMessagesExist } from "../../store/reducer/isAnalyzedMessagesExistSlice";

const AttachmentSectionBox = styled.div`
  margin-top: 80px;
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
`;

const ButtonBox = styled.div`
  margin-bottom: 50px;
  > :first-child {
    margin-bottom: 10px;
  }
`;

const OsListBox = styled.div`
  margin-top: 100px;
`;

/**
 * 텍스트 파일을 메시지 데이터로 디코딩합니다.
 * @param {any[]} attachedFiles - 첨부된 파일 배열
 * @returns {Promise<any[]>} - 디코딩된 메시지 데이터 배열을 포함하는 프로미스 객체
 */
const decodeTxtFileIntoMessageData = async (attachedFiles: any[], osIndex: number | null) => {
  const analyzedMessages: MessageInfo[][] = [];
  for (const fileGroup of attachedFiles) {
    const filteredMessages: OriginMessageData[][] = await Promise.all(
      fileGroup.map(async (file: File) => {
        const base64 = await readAsDataURL(file);
        // 여기서 분기점
        // return base64 && breakdownTxtFile(base64);
        if (osIndex === 1) {
          return base64 && breakdownTxtFileWindow(base64);
        }
        if (osIndex === 2) {
          return base64 && breakdownTxtFileMacOS(base64);
        }
        if (osIndex === 3) {
          return base64 && breakdownTxtFileAndroid(base64);
        }
        if (osIndex === 4) {
          return base64 && breakdownTxtFileIOS(base64);
        }
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

const analyzeMessage = async (attachedFiles: FileObject[][], osIndex: number | null) => {
  const analyzedMessages: MessageInfo[][] = await decodeTxtFileIntoMessageData(attachedFiles, osIndex);
  const analyzedMessageData: AnalyzedMessage[][][] = transformIntoTableForm(analyzedMessages);
  return analyzedMessageData;
};

const AttachmentSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const attachmentSectionRef = useRef<HTMLDivElement | null>(null);

  const [attachedFiles, setAttachedFiles] = useState<FileObject[][]>([]);
  const [selectedOsIndex, setSelectedOsIndex] = useState<number | null>(null);

  // 파일 확장자 허용 타입
  const isAllowedFileType = (file: File): boolean => {
    const allowedExtensions = [".txt", ".csv"];
    const fileType = file.name.substring(file.name.lastIndexOf("."));
    return allowedExtensions.includes(fileType);
  };

  const pushNewlyAttachedFiles = (files: any[]) => {
    const allowedFiles = files.filter((file) => isAllowedFileType(file));
    if (allowedFiles.length === 0) {
      alert("파일은 오직 .txt 그리고 .csv만 첨부가 가능합니다");
      return;
    }
    if (attachedFiles.length) {
      return setAttachedFiles([...attachedFiles, [...allowedFiles]]);
    }
    setAttachedFiles([[...allowedFiles]]);
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
      const analyzedMessage: AnalyzedMessage[][][] = await analyzeMessage(
        attachedFiles,
        selectedOsIndex
      );
      dispatch(setAnalyzedMessages(analyzedMessage));
      dispatch(setIsAnalyzedMessagesExist(true));
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickAnalyzeButton = () => {
    dispatchAnalyzedMessages(attachedFiles);
    navigate("/dashboard");
  };

  const handleScrollDown = () => {
    if (attachmentSectionRef.current) {
      scrollToEvent(
        attachmentSectionRef.current.offsetTop + attachmentSectionRef.current.offsetHeight,
        "smooth"
      );
    }
  };

  // const handleDeleteAllButton = () => {
  //   setAttachedFiles([]);
  // };

  useEffect(() => {}, [attachedFiles]);

  useEffect(() => {}, [selectedOsIndex]);

  return (
    <AttachmentSectionBox ref={attachmentSectionRef}>
      {!selectedOsIndex ? (
        <OsListBox>
          <OsList
            size="100px"
            selectedOsIndex={selectedOsIndex}
            setSelectedOsIndex={setSelectedOsIndex}
          />
          <Span fontSize="24px">운영체제를 선택해 주세요.</Span>
        </OsListBox>
      ) : (
        <>
          <FileDrop
            pushNewlyAttachedFiles={pushNewlyAttachedFiles}
            handleChangeFile={handleChangeFile}
            selectedOsIndex={selectedOsIndex}
            setSelectedOsIndex={setSelectedOsIndex}
          ></FileDrop>
          <AttachedFileList
            attachedFiles={attachedFiles}
            deleteAttachedFileArray={deleteAttachedFileArray}
          ></AttachedFileList>
          {/* {attachedFiles.length !== 0 && (
            <RadiusButton onClick={handleDeleteAllButton}>전체 삭제하기</RadiusButton>
          )} */}

          <ButtonBox>
            <RadiusButton onClick={handleClickAnalyzeButton} disabled={!attachedFiles.length}>
              분석하기
            </RadiusButton>
            {!attachedFiles.length && <Span fontSize="14px">* 파일을 첨부해 주세요</Span>}
          </ButtonBox>
          <ScrollIndicator onClick={handleScrollDown}>카카오톡 메시지 내보내기 방법은?</ScrollIndicator>
        </>
      )}
    </AttachmentSectionBox>
  );
};

export default AttachmentSection;
