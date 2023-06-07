import React, { useState } from "react";
import styled from "styled-components";
import AttachmentButton from "../atoms/AttachmentButton";
import Paragraph from "../atoms/Paragraph";
import Span from "../atoms/Span";
import OsList from "./OsList";
import { useDispatch } from "react-redux";
import { pushNewlyAttachedFiles } from "../../store/reducer/attachedFileListSlice";
import { VscNewFile } from "react-icons/vsc";

const DropBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 900px;
  height: 400px;
  /* padding: 80px 200px 80px 200px; */
  border: 3px dashed ${(props) => props.theme.mainGray};
  border-radius: 30px;

  > * {
    margin-bottom: 10px;
    font-weight: 300;
  }
  > :nth-child(1) {
    margin-bottom: 30px;
  }

  > :last-child {
    color: ${(props) => props.theme.mainGray};
  }
`;

const AttachmentBox = styled.div`
  margin-bottom: 30px;
  display: flex;
  gap: 5px;
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
  return (
    <DropBox
      className={`drop-zone ${dragging ? "dragging" : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {dragging ? (
        <>
          <VscNewFile size={60} />
          <Span fontSize="20px">Drop Files Here</Span>
        </>
      ) : (
        <>
          <OsList />
          <Span fontSize="18px">내보내기한 카카오톡 텍스트 파일을 드래그하여 여기에 끌어다 놓거나</Span>
          <AttachmentBox>
            <AttachmentButton onChange={handleChangeFile}>첨부하기</AttachmentButton>
            <Paragraph fontSize="18px">버튼을 클릭하세요.</Paragraph>
          </AttachmentBox>
          <Span fontSize="15px">* 올바른 운영체제를 선택하지 않으면 분석이 불가능합니다.</Span>
        </>
      )}
    </DropBox>
  );
};

export default FileDrop;
