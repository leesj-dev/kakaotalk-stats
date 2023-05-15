import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AnalyzedMessage } from "../../@types/index.d";
import KeywordCloud from "../organisms/graphs/KeywordCloud";
import ReplyLineGraph from "../organisms/graphs/ReplyLineGraph";
import MostChatTimesGraph from "../organisms/graphs/MostChatTimesGraph";
import scrollToEvent from "../../module/common/scrollEvent";
import ChatRatioGraph from "../organisms/graphs/ChatRatioGraph";
import TimezoneGraph from "../organisms/graphs/TimezoneGraph";
import PeriodRatioGraph from "../organisms/graphs/PeriodRatioGraph";
import SummaryPieGraph from "../organisms/graphs/SummaryPieGraph";
import DatePickerCalendar from "../organisms/DatePickerCalendar";
import Dashboard from "../templates/DashboardTemplate";
import DashboardTemplate from "../templates/DashboardTemplate";

const AnalysisPageBox = styled.div`
  margin-top: 100px;
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
      <DashboardTemplate />
      {Array.isArray(results) && results.length !== 0 && <DatePickerCalendar />}
      {Array.isArray(results) && results.length !== 0 && <SummaryPieGraph />}
      {Array.isArray(results) && results.length !== 0 && <PeriodRatioGraph />}
      {Array.isArray(results) && results.length !== 0 && <ChatRatioGraph />}
      {Array.isArray(results) && results.length !== 0 && <TimezoneGraph />}
      {Array.isArray(results) && results.length !== 0 && <KeywordCloud />}
      {Array.isArray(results) && results.length !== 0 && <ReplyLineGraph />}
      {Array.isArray(results) && results.length !== 0 && <MostChatTimesGraph />}
    </AnalysisPageBox>
  );
};

export default AnalysisPage;
