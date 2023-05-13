import React from "react";
import styled from "styled-components";
import AttachDescriptionSection from "../section/AttachDescriptionSection";
import AttachmentSection from "../section/AttachmentSection";

const InstructionsWithAttachmentBox = styled.div``;

const InstructionsWithAttachment = () => {
  return (
    <InstructionsWithAttachmentBox>
      <AttachmentSection />
      <AttachDescriptionSection />
    </InstructionsWithAttachmentBox>
  );
};

export default InstructionsWithAttachment;
