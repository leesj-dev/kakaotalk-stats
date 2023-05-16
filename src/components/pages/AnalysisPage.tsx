import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AnalyzedMessage } from "../../@types/index.d";
import KeywordCloud from "../organisms/graphs/KeywordCloud";
import ReplyLineGraph from "../organisms/graphs/ReplyLineGraph";
import MostChatTimesGraph from "../organisms/graphs/MostChatTimesGraph";
import scrollToEvent from "../../module/common/scrollEvent";
import ChatRatioGraph from "../organisms/graphs/ChatRaitoGraph";
import TimezoneGraph from "../organisms/graphs/TimezoneGraph";
import ChatVolumeGraph from "../organisms/graphs/ChatVolumeGraph";
import SummaryPieGraph from "../organisms/graphs/SummaryPieGraph";
import DatePickerCalendar from "../organisms/DatePickerCalendar";
import DashboardSection from "../section/DashboardSection";
import DashboardSideMenu from "../section/DashboardSideMenu";

const AnalysisPageBox = styled.div`
  margin-top: 80px;
  display: flex;
  width: 100%;

  > :nth-child(1) {
    width: 15%;
  }
  > :nth-child(2) {
    width: 85%;
  }
`;

const TempGraphBox = styled.div`
  height: 500px;
`;

const AnalysisPage = () => {
  const results = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage }) => state.analyzedMessagesSlice
  );

  useEffect(() => {
    scrollToEvent(0, "auto");
  }, []);

  return (
    <AnalysisPageBox>
      <DashboardSideMenu />
      <DashboardSection />
      {/* <TempGraphBox>
        {Array.isArray(results) && results.length !== 0 && <DatePickerCalendar />}
      </TempGraphBox>
      <TempGraphBox>
        {Array.isArray(results) && results.length !== 0 && <SummaryPieGraph />}
      </TempGraphBox>
      <TempGraphBox>
        {Array.isArray(results) && results.length !== 0 && <ChatVolumeGraph />}
      </TempGraphBox>
      <TempGraphBox>{Array.isArray(results) && results.length !== 0 && <ChatRatioGraph />}</TempGraphBox>
      <TempGraphBox>{Array.isArray(results) && results.length !== 0 && <TimezoneGraph />}</TempGraphBox>
      <TempGraphBox>{Array.isArray(results) && results.length !== 0 && <KeywordCloud />}</TempGraphBox>
      <TempGraphBox>{Array.isArray(results) && results.length !== 0 && <ReplyLineGraph />}</TempGraphBox>
      <TempGraphBox>
        {Array.isArray(results) && results.length !== 0 && <MostChatTimesGraph />}
      </TempGraphBox> */}
    </AnalysisPageBox>
  );
};

export default AnalysisPage;
