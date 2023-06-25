import React from "react";
import styled from "styled-components";
import { FlexCenterDiv, FlexColumnCenterDiv } from "../../atoms/FlexDiv";
import SpeakerSelect from "../../molecules/dashboard/SpeakerSelect";
import ChatRatioWithArrowGraph from "../../molecules/graphs/ChatRatioWithArrowGraph";

const SpeakerSelectBox = styled(FlexColumnCenterDiv)`
  margin: 0 auto;
  width: 100%;
  height: 100%;
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
