import React, { useRef, useState } from "react";
import styled from "styled-components";
import AttachedFileList from "../../molecules/attachment/AttachedFileList";
import BlueButton from "../../atoms/BlueButton";
import ScrollIndicator from "../../molecules/common/ScrollIndicator";
import FileDrop from "../../organisms/attachment/FileDrop";
import {
  AnalyzedMessage,
  Chatroom,
  FileObject,
  MessageInfo,
  OriginMessageData,
} from "../../../@types/index.d";

import { decodeTextFile, readAsDataURL } from "../../../module/core/breakdownTxtFile";
import { getMessageData } from "../../../module/core/getMessageData";
import { useDispatch, useSelector } from "react-redux";
import { setAnalyzedMessages } from "../../../store/reducer/dashboard/analyzedMessagesSlice";
import { useNavigate } from "react-router";
import scrollToEvent from "../../../module/common/scrollToEvent";
import {
  pushNewlyAttachedFiles,
  setAttachedFileList,
} from "../../../store/reducer/attachment/attachedFileListSlice";
import { setIsAnalyzedMessagesExist } from "../../../store/reducer/dashboard/isAnalyzedMessagesExistSlice";
import Paragraph from "../../atoms/Paragraph";
import OsList from "../../organisms/attachment/OsList";
import { FlexColumnCenterDiv } from "../../atoms/FlexDiv";
import Loading from "../../molecules/common/Loading";
import { borderRadius } from "../../../style/specifiedCss/borderRadius";

const AttachmentSectionBox = styled(FlexColumnCenterDiv)`
  position: relative;
  margin: 8rem auto 0 auto;
  padding: 8rem 0;
  max-width: 1220px;

  @media (max-width: 768px) {
    margin: 6rem auto 0 auto;
  }
`;

const ButtonBox = styled.div`
  margin-bottom: 30px;
  > :first-child {
    margin-bottom: 10px;
  }
`;

const OsContentBox = styled.div`
  margin: 0 auto 30px auto;
  padding: 10rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  width: 80%;
  height: 420px;
  max-width: 970px;
  border: 2px dashed var(--mainGray);
  border-radius: ${borderRadius.strong};

  @media (max-width: 480px) {
    padding: 6rem 2rem;
  }
`;

const OsContentTitle = styled(Paragraph)`
  font-size: 2.4rem;
`;

const OsListBox = styled.div``;

const OsNotice = styled(Paragraph)`
  font-size: 1.5rem;
  color: var(--mainBlueHover);
  text-align: center;
  transition: color 0.3s;
`;

const ScrollIndicatorBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

/**
 * 텍스트 파일을 메시지 데이터로 디코딩합니다.
 * @param {any[]} attachedFileList - 첨부된 파일 배열
 * @returns {Promise<any[]>} - 디코딩된 메시지 데이터 배열을 포함하는 프로미스 객체
 */
const decodeTxtFileToMessageData = async (attachedFileList: any[], osIndex: number | null) => {
  const analyzedMessages: MessageInfo[][] = [];
  for (const fileGroup of attachedFileList) {
    const filteredMessages: OriginMessageData[][] = await Promise.all(
      fileGroup.map(async (file: File) => {
        const base64 = await readAsDataURL(file);
        return osIndex && base64 && decodeTextFile(base64, osIndex);
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

// 파일 확장자 허용 타입
export const isAllowedFileType = (file: File): boolean => {
  const allowedExtensions = [".txt", ".csv"];
  const fileType = file.name.substring(file.name.lastIndexOf("."));
  return allowedExtensions.includes(fileType);
};

const AttachmentSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedOsIndex = useSelector(
    (state: { selectedOsIndexSlice: number }) => state.selectedOsIndexSlice
  );
  const attachedFileList = useSelector(
    (state: { attachedFileListSlice: FileObject[][] }) => state.attachedFileListSlice
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const attachmentSectionRef = useRef<HTMLDivElement | null>(null);

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = event.target.files;
    if (files && files.length) {
      dispatch(pushNewlyAttachedFiles(Array.prototype.slice.call(files)));
    }
  };

  const dispatchAnalyzedMessages = async (attachedFileList: FileObject[][]) => {
    const analyzedMessage: AnalyzedMessage[][][] = await analyzeMessage(
      attachedFileList,
      selectedOsIndex
    );

    let indexesToFilterAttackedFile: number[] = [];
    const filteredMessage = analyzedMessage.filter((messages, index) => {
      if (messages.length !== 0) {
        indexesToFilterAttackedFile.push(1);
        return true;
      } else {
        indexesToFilterAttackedFile.push(0);
        return false;
      }
    });

    const filteredAttackedFileList: FileObject[][] = [];
    indexesToFilterAttackedFile.forEach((ableFileIndex, index) => {
      ableFileIndex && filteredAttackedFileList.push(attachedFileList[index]);
    });

    const removedChatroomIndex = indexesToFilterAttackedFile.map((n, index) => {
      return n === 0 && index + 1;
    });

    if (filteredMessage.length !== analyzedMessage.length) {
      alert(
        `${removedChatroomIndex
          .filter((filterIndex) => filterIndex)
          .join(
            ", "
          )}번째 채팅방은 분석이 불가능하여 제외되었습니다. 파일의 형식 또는 내용이 올바른 파일인지 다시 확인해 주세요.`
      );
    }

    dispatch(setAttachedFileList(filteredAttackedFileList));
    if (filteredMessage.length === 0) {
      return false;
    }

    dispatch(setAnalyzedMessages(filteredMessage));
    dispatch(setIsAnalyzedMessagesExist(true));

    return true;
  };

  const handleClickAnalyzeButton = async () => {
    try {
      const analysisSuccess = await dispatchAnalyzedMessages(attachedFileList);
      const windowWidth = window.innerWidth;
      setIsLoading(false);
      if (analysisSuccess) {
        if (windowWidth > 1200) {
          navigate("/dashboard");
        } else {
          navigate("/detail");
        }
      }
    } catch {
      alert("파일 분석에 실패하였습니다. 대화 파일의 운영체제가 올바르게 선택되었는지 확인해주세요.");
      setIsLoading(false);
    }
  };

  const handleScrollDown = () => {
    if (attachmentSectionRef.current) {
      scrollToEvent(
        attachmentSectionRef.current.offsetTop + attachmentSectionRef.current.offsetHeight - 30,
        "smooth"
      );
    }
  };

  /**
   * 메시지를 분석합니다.
   * @param {any[]} attachedFileList - 첨부된 파일 배열
   * @returns {Promise<AnalyzedMessage[][][]>} - 분석된 메시지 데이터 배열을 포함하는 프로미스 객체
   */
  const analyzeMessage = async (attachedFileList: FileObject[][], osIndex: number | null) => {
    setIsLoading(true);
    const analyzedMessages: MessageInfo[][] = await decodeTxtFileToMessageData(
      attachedFileList,
      osIndex
    );
    const analyzedMessageData: AnalyzedMessage[][][] = transformIntoTableForm(analyzedMessages);
    return analyzedMessageData;
  };

  return (
    <AttachmentSectionBox ref={attachmentSectionRef}>
      {isLoading && <Loading />}
      {!selectedOsIndex ? (
        <OsContentBox>
          <OsContentTitle>자신의 운영체제 아이콘을 선택해 주세요.</OsContentTitle>
          <OsListBox>
            <OsList />
          </OsListBox>
          <OsNotice>* 올바른 운영체제를 선택하지 않으면 분석이 불가능합니다.</OsNotice>
        </OsContentBox>
      ) : (
        <>
          <FileDrop handleChangeFile={handleChangeFile}></FileDrop>
          <AttachedFileList />
          <ButtonBox>
            <BlueButton onClick={handleClickAnalyzeButton} disabled={!attachedFileList.length}>
              분석하기
            </BlueButton>
            {!attachedFileList.length && <OsNotice>* 파일을 첨부해 주세요</OsNotice>}
          </ButtonBox>
          <ScrollIndicatorBox>
            <ScrollIndicator onClick={handleScrollDown}>
              카카오톡 메시지 내보내기 방법은?
            </ScrollIndicator>
          </ScrollIndicatorBox>
        </>
      )}
    </AttachmentSectionBox>
  );
};

export default AttachmentSection;
