import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AnalyzedMessage } from "../../../@types/index.d";
import { getSpeakers } from "../../../module/common/getProperties";
import { setSelectedSpeakerIndex } from "../../../store/reducer/dashboard/selectedSpeakerIndexSlice";
import Span from "../../atoms/Span";
import { FlexColumnDiv } from "../../atoms/FlexDiv";

const SpeakerSelectBox = styled(FlexColumnDiv)<{ alignItems?: string }>`
  align-items: ${(props) => props.alignItems || "center"};
  justify-content: center;
  width: 100%;
  font-size: 12px;

  @media (max-width: 1200px) {
    margin-bottom: 5px;
    align-items: end;
    justify-content: end;
  }
`;

const SelectNotice = styled(Span)`
  font-size: 15px;
  font-weight: 400;
  color: ${(props) => props.theme.mainBlueHover};
`;

const Select = styled.select`
  margin-bottom: 5px;
`;

const Option = styled.option``;

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
      <Select
        value={selectedSpeakerIndex === -1 ? "전체" : selectedSpeakerIndex}
        onChange={handleChangeSpeaker}
      >
        <Option value="전체" key="전체">
          전체
        </Option>
        {speakers[selectedChatRoomIndex]?.map((speaker, index) => {
          const displayName = speaker.length > 6 ? speaker.substring(0, 6) + "..." : speaker;
          return (
            <Option value={index} key={index}>
              {displayName}
            </Option>
          );
        })}
      </Select>
      <SelectNotice>*대화자 선택</SelectNotice>
    </SpeakerSelectBox>
  );
};

export default SpeakerSelect;
