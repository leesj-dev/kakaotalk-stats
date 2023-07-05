import React from "react";
import styled from "styled-components";
import Icon from "../../atoms/Icon";
import Paragraph from "../../atoms/Paragraph";
import { FileObject } from "../../../@types/index.d";
import { useDispatch, useSelector } from "react-redux";
import { deleteAttachedFileArray } from "../../../store/reducer/attachment/attachedFileListSlice";
import { MdClose } from "react-icons/md";
import { FlexCenterDiv } from "../../atoms/FlexDiv";
import { borderRadius } from "../../../style/specifiedCss/borderRadius";

const FileUlBox = styled.ul`
  margin-bottom: 2rem;
  width: 80%;
`;

const FileListBox = styled(FlexCenterDiv)`
  margin-bottom: 1rem;
  padding: 2rem;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: ${borderRadius.medium};
`;

const FileList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
`;

const CloseIcon = styled(Icon)`
  font-size: 3rem;
  color: ${(props) => props.theme.mainText};
  cursor: pointer;
`;

const AttachedFileList = () => {
  const dispatch = useDispatch();

  const attachedFileList = useSelector(
    (state: { attachedFileListSlice: FileObject[][] }) => state.attachedFileListSlice
  );

  return (
    <FileUlBox>
      {attachedFileList.map((files: FileObject[], fileArrayIndex: number) => {
        return (
          <FileListBox as="li" key={fileArrayIndex}>
            <FileList>
              {files.map((file, fileIndex) => {
                return (
                  <Paragraph key={fileIndex}>
                    📄 {file.name}
                    {fileIndex !== files.length - 1 && ","}
                  </Paragraph>
                );
              })}
            </FileList>
            <CloseIcon onClick={() => dispatch(deleteAttachedFileArray(fileArrayIndex))}>
              <MdClose />
            </CloseIcon>
          </FileListBox>
        );
      })}
    </FileUlBox>
  );
};

export default AttachedFileList;
