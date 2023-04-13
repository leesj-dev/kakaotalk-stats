import React from "react";
import styled from "styled-components";

const AttachmentBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

const List = styled.ul``;
const Label = styled.label``;
const FileInput = styled.input``;
const AttachmentButton = styled.div``;
const CancelButton = styled.div``;

const Attachment = () => {
  return (
    <AttachmentBox>
      <List>
        <Label>
          <FileInput type="file" accept=".txt" multiple />
          <AttachmentButton>첨부</AttachmentButton>
        </Label>
        <CancelButton>X</CancelButton>
      </List>
    </AttachmentBox>
  );
};

export default Attachment;
