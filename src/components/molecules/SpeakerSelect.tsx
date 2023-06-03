import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AnalyzedMessage } from "../../@types/index.d";
import { getSpeakers } from "../../module/common/getProperties";
import { setSelectedSpeakerIndex } from "../../store/reducer/selectedSpeakerIndexSlice";
import Span from "../atoms/Span";

const SpeakerSelectBox = styled.div<{
  alignItems?: string;
}>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  align-items: ${(props) => props.alignItems || "end"};

  > :nth-child(1) {
    margin-bottom: 10px;
  }
`;

interface SpeakerSelectProps {
  alignItems?: string;
}

const SpeakerSelect: React.FC<SpeakerSelectProps> = ({ alignItems }) => {
  const dispatch = useDispatch();
  const analyzedMessages = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );
  const selectedSpeakerIndex = useSelector(
    (state: { selectedSpeakerIndexSlice: number }) => state.selectedSpeakerIndexSlice
  );

  const speakers: string[][] = getSpeakers(analyzedMessages);

  const handleChangeSpeaker = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "전체") {
      dispatch(setSelectedSpeakerIndex(Number(e.target.value)));
    } else {
      dispatch(setSelectedSpeakerIndex(-1));
    }
  };

  return (
    <SpeakerSelectBox alignItems={alignItems}>
      <Span color="#7e848a">강조할 대화자</Span>
      <select
        value={selectedSpeakerIndex === -1 ? "전체" : selectedSpeakerIndex}
        onChange={handleChangeSpeaker}
      >
        <option value="전체" key="전체">
          전체
        </option>
        {speakers[selectedChatRoomIndex]?.map((speaker, index) => {
          const displayName = speaker.length > 6 ? speaker.substring(0, 6) + "..." : speaker;
          return (
            <option value={index} key={index}>
              {displayName}
            </option>
          );
        })}
      </select>
      <Span fontSize="12px" color="#0D6EFD">
        *대화자 선택 가능
      </Span>
    </SpeakerSelectBox>
  );
};

export default SpeakerSelect;
