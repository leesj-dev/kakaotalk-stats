import React, { useEffect } from "react";
import styled from "styled-components";

import AttachmentSection from "../sections/AttachmentSection";
import AttachmentDescriptionSection from "../sections/AttachDescriptionSection";
import scrollToEvent from "../../module/common/scrollEvent";

const AttachmentPageBox = styled.div`
  > :nth-child(2) {
    padding: 80px 0;
  }
`;

const AttachmentPage = () => {
  useEffect(() => {
    scrollToEvent(0, "auto");
  }, []);

  return (
    <AttachmentPageBox>
      <AttachmentSection />
      <AttachmentDescriptionSection />
    </AttachmentPageBox>
  );
};

export default AttachmentPage;
