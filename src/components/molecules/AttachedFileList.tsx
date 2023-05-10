import React from "react";
import styled from "styled-components";
import Icon from "../atoms/Icon";
import Span from "../atoms/Span";

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
        <Span>파일이름</Span>
        <Icon>X</Icon>
      </Li>
      <Li>
        <Span>파일이름</Span>
        <Icon>X</Icon>
      </Li>
      <Li>
        <Span>파일이름</Span>
        <Icon>X</Icon>
      </Li>
    </FileListBox>
  );
};

export default AttachedFileList;
