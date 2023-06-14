import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AttachmentButton from "../atoms/AttachmentButton";
import Paragraph from "../atoms/Paragraph";
import Span from "../atoms/Span";
import OsList from "./OsList";
import { useDispatch } from "react-redux";
import { pushNewlyAttachedFiles } from "../../store/reducer/attachedFileListSlice";
import { VscNewFile } from "react-icons/vsc";
import { FlexColumnCenterDiv } from "../styleComponents/FlexDiv";

const DropBox = styled(FlexColumnCenterDiv)`
  position: relative;
  width: 80%;
  padding: 8rem 0;
  margin: 0 auto;
  border: 3px dashed ${(props) => props.theme.mainGray};
  border-radius: 30px;
  z-index: 2;

  > * {
    margin-bottom: 10px;
    font-weight: 300;
    text-align: center;
  }
  > :nth-child(1) {
    margin-bottom: 3rem;
  }
  > :last-child {
    color: ${(props) => props.theme.mainGray};
    margin-bottom: 0px;
  }
  @media (max-width: 768px) {
    padding: 4rem 3rem;
  }
`;

const AttachmentBox = styled.div`
  margin-bottom: 3rem;
  display: flex;
  gap: 5px;
`;

const DragFile = styled(FlexColumnCenterDiv)`
  width: 100%;
  gap: 20px;
  z-index: 1;
`;

type DropZoneProps = {
  handleChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileDrop = ({ handleChangeFile }: DropZoneProps) => {
  const dispatch = useDispatch();

  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const files: any = Array.prototype.slice.call(e.dataTransfer.files);
    if (files && files.length) {
      dispatch(pushNewlyAttachedFiles(files));
    }

    // const fileArray: any = Array.prototype.slice.call(files);
    // pushNewlyAttachedFiles(fileArray);
    // 파일 처리 로직을 수행합니다.
  };

  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleIconDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleIconDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleIconDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  return (
    <DropBox
      className={`drop-zone ${dragging ? "dragging" : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {dragging ? (
        <DragFile
          onDragEnter={handleIconDragEnter}
          onDragLeave={handleIconDragLeave}
          onDragOver={handleIconDragOver}
        >
          <VscNewFile size={60} />
          <Span fontSize="20px">Drop Files Here</Span>
        </DragFile>
      ) : (
        <>
          <OsList />
          {screenWidth > 769 ? (
            <>
              <Span fontSize="18px">
                내보내기한 카카오톡 텍스트 파일을 드래그하여 여기에 끌어 놓거나
              </Span>
              <AttachmentBox>
                <AttachmentButton onChange={handleChangeFile}>첨부하기</AttachmentButton>
                <Paragraph fontSize="18px">버튼을 클릭하세요.</Paragraph>
              </AttachmentBox>
            </>
          ) : (
            <>
              <Span fontSize="18px">카카오톡 텍스트 파일</Span>
              <AttachmentBox>
                <AttachmentButton onChange={handleChangeFile}>첨부하기</AttachmentButton>
              </AttachmentBox>
            </>
          )}
          <Span fontSize="15px">* 올바른 운영체제를 선택하지 않으면 분석이 불가능합니다.</Span>
        </>
      )}
    </DropBox>
  );
};

export default FileDrop;
