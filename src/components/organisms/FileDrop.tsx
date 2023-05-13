import React, { useState } from "react";
import styled from "styled-components";
import Img from "../atoms/Img";
import AttachmentButton from "../atoms/AttachmentButton";
import Paragraph from "../atoms/Paragraph";
import Span from "../atoms/Span";
import FlexCenterDiv from "../atoms/FlexCenterDiv";

const DropBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 80px 200px 80px 200px;
  border: 3px dashed ${(props) => props.theme.mainGray};
  border-radius: 30px;

  > * {
    margin-bottom: 10px;
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

const OsIconBox = styled.ul`
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80%;
  gap: 10px;
`;

const OsListBox = styled.li`
  > :first-child {
    margin-bottom: 5px;
    width: 50px;
    height: 50px;
  }
`;

interface OsData {
  id: number;
  src: string;
  os: string;
}

const osData = [
  {
    id: 0,
    src: `${process.env.PUBLIC_URL + "/assets/osIcons/window.png"}`,
    os: "Window",
  },
  {
    id: 1,
    src: `${process.env.PUBLIC_URL + "/assets/osIcons/mac.png"}`,
    os: "MacOS",
  },
  {
    id: 2,
    src: `${process.env.PUBLIC_URL + "/assets/osIcons/android.png"}`,
    os: "Android",
  },
  {
    id: 3,
    src: `${process.env.PUBLIC_URL + "/assets/osIcons/ios.png"}`,
    os: "IOS",
  },
];

type DropZoneProps = {
  pushNewlyAttachedFiles: (files: any) => void;
  handleChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileDrop = ({ pushNewlyAttachedFiles, handleChangeFile }: DropZoneProps) => {
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
      pushNewlyAttachedFiles(files);
    }
    const fileArray: any = Array.prototype.slice.call(files);
    pushNewlyAttachedFiles(fileArray);
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
      <OsIconBox>
        {osData.map((data: OsData) => {
          return (
            <OsListBox key={data.id}>
              <Img src={data.src} />
              <Span>{data.os}</Span>
            </OsListBox>
          );
        })}
      </OsIconBox>
      <Span fontSize="18px">내보내기한 카카오톡 텍스트 파일을 드래그하여 여기에 끌어다 놓거나</Span>
      <AttachmentBox>
        <AttachmentButton onChange={handleChangeFile}>첨부하기</AttachmentButton>
        <Paragraph fontSize="18px">버튼을 클릭하세요.</Paragraph>
      </AttachmentBox>
      <Span fontSize="15px">* 올바른 운영체제를 선택하지 않으면 분석이 불가합니다.</Span>
    </DropBox>
  );
};

export default FileDrop;
