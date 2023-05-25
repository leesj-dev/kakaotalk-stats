import React from "react";
import styled from "styled-components";
import Icon from "../atoms/Icon";
import Paragraph from "../atoms/Paragraph";
import { FileObject } from "../../@types/index.d";
import { useDispatch, useSelector } from "react-redux";
import { deleteAttachedFileArray } from "../../store/reducer/attachedFileListSlice";

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
  const dispatch = useDispatch();

  const attachedFileList = useSelector(
    (state: { attachedFileListSlice: FileObject[][] }) => state.attachedFileListSlice
  );

  return (
    <FileListBox>
      {attachedFileList.map((files: FileObject[], fileArrayIndex: number) => {
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
            <Icon onClick={() => dispatch(deleteAttachedFileArray(fileArrayIndex))}>❌</Icon>
          </Li>
        );
      })}
    </FileListBox>
  );
};

export default AttachedFileList;
