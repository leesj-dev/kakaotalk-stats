import React from "react";
import styled from "styled-components";
import AttachmentButton from "./AttachmentButton";
import Paragraph from "../atoms/Paragraph";

const DropBox = styled.div`
  padding: 100px 200px;
  border: 3px dashed ${(props) => props.theme.mainGrey};

  > * {
    margin-bottom: 10px;
  }
`;

const FileDrop = () => {
  return (
    <DropBox>
      <Paragraph>파일 첨부를 위해서는 파일을 드래그하여 여기에 놓거나</Paragraph>
      <AttachmentButton onChange={() => console.log("dd")}>첨부하기</AttachmentButton>
      <Paragraph>버튼을 클릭하세요</Paragraph>
    </DropBox>
  );
};

export default FileDrop;
