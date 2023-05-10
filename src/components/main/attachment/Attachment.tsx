import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getMessageData } from "../../../module/core/getMessageData";
import {
  breakdownTxtFile,
  breakdownTxtFileWindow,
  readAsDataURL,
} from "../../../module/core/breakdownTxtFile";
import { useDispatch } from "react-redux";
import { setAnalyzedMessages } from "../../../store/reducer/messageSlice";
import DateForm from "../../datePicker/dateForm";
import { Chatroom, FileObject, MessageInfo, OriginMessageData } from "../../../@types/index.d";
import { AnalyzedMessage } from "../../../@types/index.d";
import DropZone from "./dropZone/DropZone";
import RadiusButton from "../../atoms/Button";
import AttachmentButton from "../../molecules/AttachmentButton";

const AttachmentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const List = styled.ul``;

const FileArray = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const EachFile = styled.span`
  margin-right: 5px;
`;

const Label = styled.label`
  margin: 0 auto;
  background: #f00;
`;

const FileInput = styled.input`
  display: none;
`;

const DeleteButton = styled.div`
  transform: scale(1.5);
  cursor: pointer;
  &:hover {
    background: #ddd;
  }
`;

const AnalyzeButton = styled.button``;

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

const Attachment = () => {
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

  useEffect(() => {}, [attachedFiles]);

  return (
    <AttachmentBox>
      <List>
        {attachedFiles.map((files: FileObject[], fileArrayIndex) => {
          return (
            <FileArray key={fileArrayIndex}>
              {files.map((file, fileIndex) => {
                return (
                  <EachFile key={fileIndex}>
                    {file.name}
                    {fileIndex !== files.length - 1 && ","}
                  </EachFile>
                );
              })}
              <DeleteButton onClick={() => deleteAttachedFileArray(fileArrayIndex)}>X</DeleteButton>
            </FileArray>
          );
        })}
      </List>
      <AttachmentButton onChange={handleChangeFile}>대화 추가하기</AttachmentButton>
      <DropZone pushNewlyAttachedFiles={pushNewlyAttachedFiles} />
      <AnalyzeButton
        onClick={() => dispatchAnalyzedMessages(attachedFiles)}
        disabled={!attachedFiles.length}
      >
        분석하기
      </AnalyzeButton>
    </AttachmentBox>
  );
};

export default Attachment;
