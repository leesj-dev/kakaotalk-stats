import React from "react";
import styled from "styled-components";
import { FlexCenterDiv } from "../../atoms/FlexDiv";
import SpeakerSelect from "../../molecules/dashboard/SpeakerSelect";
import ChatRatioWithArrowGraph from "../../molecules/graphs/ChatRatioWithArrowGraph";

const SpeakerSelectBox = styled(FlexCenterDiv)`
  margin: 0 auto;
  width: 100%;
  height: 100%;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const SpeakerSelectContent = () => {
  return (
    <SpeakerSelectBox>
      <ChatRatioWithArrowGraph />
      <SpeakerSelect />
    </SpeakerSelectBox>
  );
};

export default SpeakerSelectContent;
