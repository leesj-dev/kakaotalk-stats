import React from "react";
import styled from "styled-components";
import Icon from "../atoms/Icon";
import Paragraph from "../atoms/Paragraph";
import { FileObject } from "../../@types/index.d";

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

type AttachedFileListProps = {
  attachedFiles: any;
  deleteAttachedFileArray: (fileArrayIndex: number) => void;
};

const AttachedFileList = ({ attachedFiles, deleteAttachedFileArray }: AttachedFileListProps) => {
  return (
    <FileListBox>
      {attachedFiles.map((files: FileObject[], fileArrayIndex: number) => {
        return (
          <Li key={fileArrayIndex}>
            {files.map((file, fileIndex) => {
              return (
                <Paragraph key={fileIndex}>
                  📄 {file.name}
                  {fileIndex !== files.length - 1 && ","}
                </Paragraph>
              );
            })}
            <Icon onClick={() => deleteAttachedFileArray(fileArrayIndex)}>❌</Icon>
          </Li>
        );
      })}
    </FileListBox>
  );
};

export default AttachedFileList;
