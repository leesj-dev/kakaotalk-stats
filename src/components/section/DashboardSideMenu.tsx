import React from "react";
import styled from "styled-components";
import SummaryPieGraph, {
  getTotalChatCounts,
  getTwoLettersFromSpeakers,
} from "../molecules/graphs/SummaryPieGraph";
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
  width: 100%;
  color: ${(props) => props.theme.mainText};
  background: ${(props) => props.theme.mainWhite};
`;

const DashboardLayoutBox = styled.div`
  display: flex;
  flex-direction: column;
  background: #2da1fa48;
`;

const CalendarBox = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.border};
`;

const ChatroomGraphBox = styled.div`
  position: relative;
  padding: 15px;
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.mainBlack};
  background-color: ${(props) => props.theme.mainWhite};
`;

const GraphSelectionBox = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.border};
`;

const ChatroomListBox = styled.div`
  padding: 15px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  /* border-bottom: 1px solid #000; */
  background-color: ${(props) => props.theme.mainWhite};
`;

const AdditionalFunctionBox = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${(props) => props.theme.border};
  background: #2da0fa;
`;

const ChatRoomBox = styled.div`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${(props) => props.theme.mainWhite};
  border: 1px solid #ddd;
  &:hover {
    border: 1px solid #2da1fa48;
  }

  &.active {
    border: 2px solid #2b8defaf;
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
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  > :last-child {
    font-weight: 600;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ChatRoomHead = styled.div`
  display: flex;
  justify-content: space-between;
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

  const handleClickVeiwDetail = () => {};

  return (
    <DashboardSideMenuBox>
      <DashboardLayoutBox>
        <CalendarBox>채팅방 대화 비율</CalendarBox>
        <ChatroomGraphBox style={{ height: "200px" }}>
          <SummaryPieGraph />
        </ChatroomGraphBox>
        <GraphSelectionBox>채팅방 목록</GraphSelectionBox>
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
                </ChatRoomHead>
                <Span>{name}</Span>
                <Link to={`/dashboard/detail`}>상세보기 {">"}</Link>
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
