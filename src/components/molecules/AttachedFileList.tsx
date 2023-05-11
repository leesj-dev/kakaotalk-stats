import React from "react";
import styled from "styled-components";
import Icon from "../atoms/Icon";
import Paragraph from "../atoms/Paragraph";

const FileListBox = styled.div`
  width: 50%;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;

  > :nth-child(2) {
    cursor: pointer;
  }
`;

const AttachedFileList = () => {
  return (
    <FileListBox>
      <Li>
        <Paragraph>📄 파일이름</Paragraph>
        <Icon>❌</Icon>
      </Li>
      <Li>
        <Paragraph>📄 파일이름</Paragraph>
        <Icon>❌</Icon>
      </Li>
      <Li>
        <Paragraph>📄 파일이름</Paragraph>
        <Icon>❌</Icon>
      </Li>
    </FileListBox>
  );
};

export default AttachedFileList;
