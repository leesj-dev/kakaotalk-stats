import React from "react";
import styled from "styled-components";

const DashboardSideMenuBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 80px);
  background: #f0f;
`;

const DashboardLayoutBox = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  background: #ff000d;
`;

const CalendarBox = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  background: #5100ff;
`;

const ChatroomGraphBox = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  background: #00ff37;
`;

const GraphSelectionBox = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  background: #ccff00;
`;

const ChatroomListBox = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  background: #ffbf00;
`;

const AdditionalFunctionBox = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  background: #00bbff;
`;

const DashboardSideMenu = () => {
  return (
    <DashboardSideMenuBox>
      <DashboardLayoutBox>
        <CalendarBox>캘린더</CalendarBox>
        <ChatroomGraphBox>챗룸그래프</ChatroomGraphBox>
        <GraphSelectionBox>상세선택</GraphSelectionBox>
        <ChatroomListBox>채팅방리스트</ChatroomListBox>
      </DashboardLayoutBox>
      <AdditionalFunctionBox>부가</AdditionalFunctionBox>
    </DashboardSideMenuBox>
  );
};

export default DashboardSideMenu;
