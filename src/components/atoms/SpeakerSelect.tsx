import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AnalyzedMessage } from "../../@types/index.d";
import { getSpeakers } from "../../module/common/getProperties";
import { setSelectedSpeakerIndex } from "../../store/reducer/selectedSpeakerIndexSlice";
import Span from "./Span";

const SpeakerSelect = () => {
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

  const SpeakerSelectBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    align-items: flex-end;
  `;

  return (
    <SpeakerSelectBox>
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
      <Span fontSize="11px" color="#0D6EFD">
        각 대화자의 분석이 가능합니다
      </Span>
    </SpeakerSelectBox>
  );
};

export default SpeakerSelect;
