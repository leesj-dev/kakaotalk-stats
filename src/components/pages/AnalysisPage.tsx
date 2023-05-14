import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AnalyzedMessage } from "../../@types/index.d";
import Summary from "../main/Summary/Summary";
import WordCloud from "../main/tagCloud/WordCloud";
import ReplyLineGraph from "../main/replyLineGraph/ReplyLineGraph";
import MostChatTimesGraph from "../main/mostChatTimesGraph/MostChatTimesGraph";
import scrollToEvent from "../../module/common/scrollEvent";
import Ratio from "../main/Summary/ratio/Ratio";
import Timezone from "../main/Summary/timezone/Timezone";
import DateForm from "../datePicker/dateForm";
import PeriodRatio from "../main/Summary/periodRatio/PeriodRatio";

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
      {Array.isArray(results) && results.length !== 0 && <DateForm />}
      {Array.isArray(results) && results.length !== 0 && <Summary />}
      {Array.isArray(results) && results.length !== 0 && <PeriodRatio />}
      {Array.isArray(results) && results.length !== 0 && <Ratio />}
      {Array.isArray(results) && results.length !== 0 && <Timezone />}
      {Array.isArray(results) && results.length !== 0 && <WordCloud />}
      {Array.isArray(results) && results.length !== 0 && <ReplyLineGraph />}
      {Array.isArray(results) && results.length !== 0 && <MostChatTimesGraph />}
    </AnalysisPageBox>
  );
};

export default AnalysisPage;
