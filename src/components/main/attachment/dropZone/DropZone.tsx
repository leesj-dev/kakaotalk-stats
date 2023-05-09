import React, { useState } from "react";
import styled from "styled-components";

const DropBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 30px;
  margin: 10px;
  border: 1px dashed #555;
`;

type DropZoneProps = {
  pushNewlyAttachedFiles: (files: any) => void;
};

const DropZone = ({ pushNewlyAttachedFiles }: DropZoneProps) => {
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
      파일을 이 영역에 드래그 앤 드롭하세요.
    </DropBox>
  );
};

export default DropZone;
