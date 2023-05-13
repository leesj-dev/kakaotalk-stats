import React, { useState } from "react";
import styled from "styled-components";
import "../../style/reset.css";
import { useSelector } from "react-redux";
import { AnalyzedMessage } from "../../@types/index.d";
import Summary from "../main/Summary/Summary";
import WordCloud from "../main/tagCloud/WordCloud";
import ReplyLineGraph from "../main/replyLineGraph/ReplyLineGraph";
import AttachmentSection from "../section/AttachmentSection";
import AttachDescriptionSection from "../section/AttachDescriptionSection";

const AttachmentPageBox = styled.div`
  > :nth-child(2) {
    padding: 80px 0;
  }
`;

const AttachmentPage = () => {
  const results = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage }) => state.analyzedMessagesSlice
  );

  return (
    <AttachmentPageBox>
      <AttachmentSection />
      <AttachDescriptionSection />
      {Array.isArray(results) && results.length !== 0 && <Summary />}
      {Array.isArray(results) && results.length !== 0 && <WordCloud />}
      {Array.isArray(results) && results.length !== 0 && <ReplyLineGraph />}
    </AttachmentPageBox>
  );
};

export default AttachmentPage;
