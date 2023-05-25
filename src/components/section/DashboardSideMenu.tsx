import React from "react";
import styled from "styled-components";
import SummaryPieGraph, {
  getTotalChatCounts,
  getTwoLettersFromSpeakers,
} from "../organisms/graphs/SummaryPieGraph";
import { useDispatch, useSelector } from "react-redux";
import { AnalyzedMessage, ChatTimes } from "../../@types/index.d";
import { getChatTimes, getSpeakers } from "../../module/common/getProperties";
import Span from "../atoms/Span";
import Paragraph from "../atoms/Paragraph";
import { setSelectedChatRoomIndex } from "../../store/reducer/selectedRoomIndexSlice";
import { Link } from "react-router-dom";
import { setSelectedSpeakerIndex } from "../../store/reducer/selectedSpeakerIndexSlice";

const DashboardSideMenuBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 80px);
  border-bottom: 1px solid #000;
`;

const DashboardLayoutBox = styled.div`
  display: flex;
  flex-direction: column;
  background: #0004ff18;
`;

const CalendarBox = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #000;
`;

const ChatroomGraphBox = styled.div`
  position: relative;
  padding: 15px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #000;
`;

const GraphSelectionBox = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #000;
`;

const ChatroomListBox = styled.div`
  padding: 15px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  border-bottom: 1px solid #000;
`;

const AdditionalFunctionBox = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  background: #00bbff;
`;

const ChatRoomBox = styled.div`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    box-shadow: 0px 0px 9px 3px ${(props) => props.theme.mainBlue};
  }

  &.active {
    box-shadow: 0px 0px 7px 1px ${(props) => props.theme.mainBlue};
  }

  > :nth-child(1) {
    margin-bottom: 5px;
    display: flex;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  > :nth-child(2) {
    display: block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ChatRoomHead = styled.div`
  display: flex;
  justify-content: space-between;

  > :nth-child(2) {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const DashboardSideMenu = () => {
  const dispatch = useDispatch();
  const analyzedMessages = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );

  const speakers: string[][] = getSpeakers(analyzedMessages);
  const chatRoomNames: string[] = getTwoLettersFromSpeakers(speakers);
  const chatTimes: ChatTimes[][][] = getChatTimes(analyzedMessages);
  const totalChatCounts: number[] = getTotalChatCounts(chatTimes);

  const handleClickChatRoom = (index: number) => {
    dispatch(setSelectedChatRoomIndex(index));
    dispatch(setSelectedSpeakerIndex(-1));
  };

  return (
    <DashboardSideMenuBox>
      <DashboardLayoutBox>
        <CalendarBox>캘린더</CalendarBox>
        <ChatroomGraphBox style={{ height: "200px" }}>
          <SummaryPieGraph />
        </ChatroomGraphBox>
        <GraphSelectionBox>상세선택</GraphSelectionBox>
        <ChatroomListBox>
          {chatRoomNames.map((name, index) => {
            return (
              <ChatRoomBox
                key={index}
                className={`${selectedChatRoomIndex === index && "active"}`}
                onClick={() => handleClickChatRoom(index)}
              >
                <ChatRoomHead>
                  <Paragraph>
                    채팅방{index + 1} ({totalChatCounts[index]}){" "}
                  </Paragraph>
                  <Link to="">상세보기 {">"}</Link>
                </ChatRoomHead>
                <Span>{name}</Span>
              </ChatRoomBox>
            );
          })}
        </ChatroomListBox>
      </DashboardLayoutBox>
      <AdditionalFunctionBox>부가</AdditionalFunctionBox>
    </DashboardSideMenuBox>
  );
};

export default DashboardSideMenu;
