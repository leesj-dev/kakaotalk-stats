import React from "react";
import styled from "styled-components";
import "../../style/reset.css";

import AttachmentSection from "../section/AttachmentSection";
import AttachmentDescriptionSection from "../section/AttachDescriptionSection";

const AttachmentPageBox = styled.div`
  > :nth-child(2) {
    padding: 80px 0;
  }
`;

const AttachmentPage = () => {
  return (
    <AttachmentPageBox>
      <AttachmentSection />
      <AttachmentDescriptionSection />
    </AttachmentPageBox>
  );
};

export default AttachmentPage;
