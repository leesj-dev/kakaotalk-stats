import React from "react";
import styled from "styled-components";
import AttachmentButton from "../molecules/AttachmentButton";
import AttachedFileList from "../molecules/AttachedFileList";
import FileDrop from "../molecules/FileDrop";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 1200px;
`;

const FileAttachment = () => {
  return (
    <Container>
      <FileDrop></FileDrop>
      <AttachedFileList></AttachedFileList>
      <AttachmentButton onChange={() => console.log("dd")}>분석하기</AttachmentButton>
    </Container>
  );
};

export default FileAttachment;
