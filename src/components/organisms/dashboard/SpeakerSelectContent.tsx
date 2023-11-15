import styled from "styled-components";
import { FlexCenterDiv } from "../../atoms/FlexDiv";
import SpeakerSelect from "../../molecules/dashboard/SpeakerSelect";
import ChatRatioWithArrowGraph from "../../molecules/graphs/ChatRatioWithArrowGraph";
import { GraphPropsInterface } from "../../../@types/index.d";

const SpeakerSelectBox = styled(FlexCenterDiv)`
  margin: 0 auto;
  width: 100%;
  height: 100%;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const SpeakerSelectContent = ({ analyzedMessages, selectedChatRoomIndex }: GraphPropsInterface) => {
  return (
    <SpeakerSelectBox>
      <ChatRatioWithArrowGraph
        analyzedMessages={analyzedMessages}
        selectedChatRoomIndex={selectedChatRoomIndex}
      />
      <SpeakerSelect analyzedMessages={analyzedMessages} selectedChatRoomIndex={selectedChatRoomIndex} />
    </SpeakerSelectBox>
  );
};

export default SpeakerSelectContent;
