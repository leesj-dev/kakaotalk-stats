import React, { useEffect } from "react";
import styled from "styled-components";
import scrollToEvent from "../../module/common/scrollToEvent";
import DashboardSection from "../sections/dashboard/DashboardSection";
import DashboardSideMenu from "../sections/dashboard/DashboardSideMenu";
import { useSelector } from "react-redux";
import { AnalyzedMessage } from "../../@types/index.d";

const DashboardBox = styled.div`
  margin-top: 80px;
  display: flex;
  width: 100%;

  > :nth-child(1) {
    width: 15%;
  }
  > :nth-child(2) {
    width: 85%;
  }
  @media (max-width: 1200px) {
    margin-top: 70px;
    > :nth-child(2) {
      width: 100%;
    }
  }
`;

const DashboardPage = () => {
  const analyzedMessages = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );

  useEffect(() => {
    scrollToEvent(0, "auto");
  }, []);

  return (
    <DashboardBox>
      <DashboardSideMenu
        analyzedMessages={analyzedMessages}
        selectedChatRoomIndex={selectedChatRoomIndex}
      />
      <DashboardSection
        analyzedMessages={analyzedMessages}
        selectedChatRoomIndex={selectedChatRoomIndex}
      />
    </DashboardBox>
  );
};

export default DashboardPage;
