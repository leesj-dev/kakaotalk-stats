import React from "react";
import styled from "styled-components";
import Icon from "../atoms/Icon";
import Paragraph from "../atoms/Paragraph";

const FileListBox = styled.div`
  width: 400px;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const AttachedFileList = () => {
  return (
    <FileListBox>
      <Li>
        <Paragraph>파일이름</Paragraph>
        <Icon>X</Icon>
      </Li>
      <Li>
        <Paragraph>파일이름</Paragraph>
        <Icon>X</Icon>
      </Li>
      <Li>
        <Paragraph>파일이름</Paragraph>
        <Icon>X</Icon>
      </Li>
    </FileListBox>
  );
};

export default AttachedFileList;
