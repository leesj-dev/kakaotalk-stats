import React from "react";
import styled from "styled-components";
import AttachedFileList from "../molecules/AttachedFileList";
import FileDrop from "../molecules/FileDrop";
import ScrollIndicator from "../molecules/ScrollIndicator";
import RadiusButton from "../atoms/Button";

const Container = styled.div`
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
const FileAttachment = () => {
  return (
    <Container>
      <FileDrop></FileDrop>
      <AttachedFileList></AttachedFileList>
      <RadiusButton>분석하기</RadiusButton>
      <ScrollIndicator></ScrollIndicator>
    </Container>
  );
};

export default FileAttachment;
