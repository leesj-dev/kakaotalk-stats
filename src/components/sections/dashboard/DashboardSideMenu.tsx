import React from "react";
import styled from "styled-components";
import SummaryPieGraph, {
  getTotalChatCounts,
  getTwoLettersFromSpeakers,
} from "../../molecules/graphs/SummaryPieGraph";
import { useDispatch, useSelector } from "react-redux";
import { AnalyzedMessage, ChatTimes } from "../../../@types/index.d";
import { getChatTimes, getSpeakers } from "../../../module/common/getProperties";
import Span from "../../atoms/Span";
import { setSelectedChatRoomIndex } from "../../../store/reducer/dashboard/selectedRoomIndexSlice";
import { Link } from "react-router-dom";
import { setSelectedSpeakerIndex } from "../../../store/reducer/dashboard/selectedSpeakerIndexSlice";
import { setIsSideMenuChatRoom } from "../../../store/reducer/dashboard/isSideMenuChatRoomSelectSlice";
import { FlexColumnDiv } from "../../atoms/FlexDiv";
import { borderRadius } from "../../../style/specifiedCss/borderRadius";

const DashboardLayoutBox = styled(FlexColumnDiv)<{ isSideMenu?: Boolean }>`
  position: sticky;
  top: 80px;
  left: 0;
  width: 15%;
  height: calc(100vh - 80px);
  background: var(--mainBackground);

  * {
    transition: background 0.3s;
  }

  @media (max-width: 1200px) {
    display: ${(props) => !props.isSideMenu && "none"};
    width: 100%;
    height: 100%;
  }
`;

const ChatroomMenuTitleBox = styled(FlexColumnDiv)`
  padding: 15px;
  text-align: center;
  font-size: 18px;
  color: var(--mainText);
  letter-spacing: 0.05rem;
  background: var(--dashboardMenuBackground);
`;

const ChatroomGraphBox = styled.div`
  position: relative;
  padding: 15px;
  display: flex;
  height: 200px;
  border-bottom: 1px solid var(--border);
  @media (max-width: 768px) {
    height: 150px;
  }
`;

const ChatroomListBox = styled(FlexColumnDiv)`
  padding: 15px;
  gap: 10px;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  @media (max-width: 1200px) {
    padding: 20px 20px;
    height: 200px;
    border-bottom: 1px solid var(--border);
  }
  &::-webkit-scrollbar {
    width: 6px; /* 스크롤바의 너비 */
  }
  &::-webkit-scrollbar-thumb {
    border-radius: ${borderRadius.medium};
    background: var(--mainGray); /* 스크롤바의 색상 */
  }
  &::-webkit-scrollbar-track {
    background: rgba(144, 144, 144, 0.2); /*스크롤바 뒷 배경 색상*/
  }
`;

const ChatRoomBox = styled.div`
  padding: 10px;
  border-radius: ${borderRadius.weak};
  border: 1px solid var(--border);
  cursor: pointer;
  background: var(--mainWhite);
  &:hover {
    border: 1px solid var(--dashboardBackground);
  }
  &.active {
    border: 2px solid var(--mainGray);
  }
  > * {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ChatRoomHead = styled(Span)`
  font-size: 1.6rem;
  margin-bottom: 5px;
  font-weight: 500;
`;

const ChatroomName = styled(Span)`
  margin-bottom: 5px;
`;

const ToDetailLink = styled(Span)`
  font-weight: 700;

  &:hover {
    text-decoration: underline;
  }
`;

interface DashboardSideMenuProps {
  isSideMenu?: Boolean;
  analyzedMessages: AnalyzedMessage[];
  selectedChatRoomIndex: number;
}

const DashboardSideMenu: React.FC<DashboardSideMenuProps> = ({
  analyzedMessages,
  selectedChatRoomIndex,
  isSideMenu,
}) => {
  const dispatch = useDispatch();

  const speakers: string[][] = getSpeakers(analyzedMessages);
  const chatRoomNames: string[] = getTwoLettersFromSpeakers(speakers);
  const chatTimes: ChatTimes[][][] = getChatTimes(analyzedMessages);
  const totalChatCounts: number[] = getTotalChatCounts(chatTimes);

  const handleClickChatRoom = (index: number) => {
    dispatch(setSelectedChatRoomIndex(index));
    dispatch(setSelectedSpeakerIndex(-1));
  };

  const closeMenu = () => {
    dispatch(setIsSideMenuChatRoom(false));
  };

  const graphProps = {
    analyzedMessages,
    selectedChatRoomIndex,
  };

  return (
    <DashboardLayoutBox isSideMenu={isSideMenu}>
      <ChatroomMenuTitleBox>채팅방 대화 비율</ChatroomMenuTitleBox>
      <ChatroomGraphBox>
        <SummaryPieGraph {...graphProps} />
      </ChatroomGraphBox>
      <ChatroomListBox>
        {chatRoomNames.map((name, index) => {
          return (
            <ChatRoomBox
              key={index}
              className={`${selectedChatRoomIndex === index && "active"}`}
              onClick={() => {
                handleClickChatRoom(index);
              }}
            >
              <ChatRoomHead>
                채팅방{index + 1} ({totalChatCounts[index]})
              </ChatRoomHead>
              <ChatroomName>{name}</ChatroomName>
              <ToDetailLink>
                <Link to={`/detail`} onClick={closeMenu}>
                  상세보기 {">"}
                </Link>
              </ToDetailLink>
            </ChatRoomBox>
          );
        })}
      </ChatroomListBox>
    </DashboardLayoutBox>
  );
};

export default DashboardSideMenu;
