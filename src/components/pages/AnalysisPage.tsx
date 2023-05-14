import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AnalyzedMessage } from "../../@types/index.d";
import Summary from "../main/Summary/Summary";
import WordCloud from "../main/tagCloud/WordCloud";
import ReplyLineGraph from "../main/replyLineGraph/ReplyLineGraph";
import MostChatTimesGraph from "../main/mostChatTimesGraph/MostChatTimesGraph";
import scrollToEvent from "../../module/common/scrollEvent";

const AnalysisPageBox = styled.div``;

const AnalysisPage = () => {
  const results = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage }) => state.analyzedMessagesSlice
  );

  useEffect(() => {
    scrollToEvent(0, "auto");
  }, []);

  return (
    <AnalysisPageBox>
      {Array.isArray(results) && results.length !== 0 && <Summary />}
      {Array.isArray(results) && results.length !== 0 && <WordCloud />}
      {Array.isArray(results) && results.length !== 0 && <ReplyLineGraph />}
      {Array.isArray(results) && results.length !== 0 && <MostChatTimesGraph />}
    </AnalysisPageBox>
  );
};

export default AnalysisPage;
