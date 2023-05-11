import React from "react";
import FileAttachment from "../organisms/FileAttachment";
import Description from "../organisms/Description";
import styled from "styled-components";

const InstructionsWithAttachmentBox = styled.div``;

const InstructionsWithAttachment = () => {
  return (
    <InstructionsWithAttachmentBox>
      <FileAttachment />
      <Description />
    </InstructionsWithAttachmentBox>
  );
};

export default InstructionsWithAttachment;
