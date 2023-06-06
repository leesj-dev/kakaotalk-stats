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
  background: ${(props) => props.theme.mainBackground};
  border-right: 1px solid ${(props) => props.theme.border};
`;

const DashboardLayoutBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.dashBoardBackground};
`;

const ChatroomMenuTitleBox = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  color: ${(props) => props.theme.mainText};
  letter-spacing: 0.05rem;
  border-bottom: 1px solid ${(props) => props.theme.border};
  background: ${(props) => props.theme.dashboardMenuBackground};
`;

const ChatroomGraphBox = styled.div`
  position: relative;
  padding: 15px;
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.mainBackground};
`;

const ChatroomListTitleBox = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  color: ${(props) => props.theme.mainText};
  letter-spacing: 0.05rem;
  border-bottom: 1px solid ${(props) => props.theme.border};
  background: ${(props) => props.theme.dashboardMenuBackground};
`;

const ChatroomListBox = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.mainBackground};
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 6px; /* 스크롤바의 너비 */
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.mainGray}; /* 스크롤바의 색상 */
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(144, 144, 144, 0.2); /*스크롤바 뒷 배경 색상*/
  }
`;

const ChatRoomBox = styled.div`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${(props) => props.theme.mainWhite};
  border: 1px solid ${(props) => props.theme.border};
  &:hover {
    border: 1px solid ${(props) => props.theme.dashBoardBackground};
  }

  &.active {
    border: 2px solid ${(props) => props.theme.mainGray};
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

  return (
    <DashboardSideMenuBox>
      <DashboardLayoutBox>
        <ChatroomMenuTitleBox>채팅방 대화 비율</ChatroomMenuTitleBox>
        <ChatroomGraphBox style={{ height: "200px" }}>
          <SummaryPieGraph />
        </ChatroomGraphBox>
        <ChatroomListTitleBox>채팅방 목록</ChatroomListTitleBox>
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
    </DashboardSideMenuBox>
  );
};

export default DashboardSideMenu;
