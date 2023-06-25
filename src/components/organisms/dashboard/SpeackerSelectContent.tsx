import React from "react";
import styled from "styled-components";
import { FlexCenterDiv } from "../../atoms/FlexDiv";
import SpeakerSelect from "../../molecules/dashboard/SpeakerSelect";
import ChatRatioWithArrowGraph from "../../molecules/graphs/ChatRatioWithArrowGraph";

const SpeakerSelectBox = styled(FlexCenterDiv)`
  margin: 0 auto;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;

  > * {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
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
