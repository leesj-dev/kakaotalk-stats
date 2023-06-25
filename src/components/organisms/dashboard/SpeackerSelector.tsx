import React from "react";
import styled from "styled-components";
import { FlexCenterDiv } from "../../atoms/FlexDiv";
import ChatRatioWithArrowGraph from "../../molecules/graphs/ChatRatioWithArrowGraph";

const SelectSpeakerBox = styled(FlexCenterDiv)`
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
const SpeakerSelector = () => {
  return (
    <SelectSpeakerBox>
      <ChatRatioWithArrowGraph />
      <SpeakerSelector />
    </SelectSpeakerBox>
  );
};

export default SpeakerSelector;
