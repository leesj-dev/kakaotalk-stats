import React, { useState } from "react";
import styled from "styled-components";
import "../../style/reset.css";
// import Attachment from "./attachment/Attachment";
// import Summary from "./Summary/Summary";
import { useSelector } from "react-redux";
import { AnalyzedMessage } from "../../@types/index.d";
// import WordCloud from "./tagCloud/WordCloud";
// import ReplyLineGraph from "./replyLineGraph/ReplyLineGraph";
import InstructionsWithAttachment from "../templates/InstructionsWithAttachment";
import Attachment from "../main/attachment/Attachment";
import Summary from "../main/Summary/Summary";
import WordCloud from "../main/tagCloud/WordCloud";
import ReplyLineGraph from "../main/replyLineGraph/ReplyLineGraph";

const Container = styled.div`
  width: 600px;
  font-size: 19px;
  border: 2px solid var(--border);
  border-radius: 20px;
  box-shadow: 1px 1px 5px 1px var(--border);
  overflow: hidden;
`;

const Section = styled.div``;

const Title = styled.h1`
  padding: 20px 0;
  font-size: 24px;
  text-align: center;
  border-bottom: 2px solid var(--border);
`;

const Body = styled.p`
  padding: 50px;
  white-space: pre-line;
  line-height: 1.5;
  border-bottom: 2px solid var(--border);
`;

const OptionBox = styled.div`
  display: flex;
`;

const Option = styled.div`
  padding: 20px 0;
  display: flex;
  flex: 1;
  justify-content: center;
  transition: 0.3s;
  cursor: pointer;

  &:first-child {
    border-right: 2px solid var(--border);
  }

  &.on {
    background: ${(props) => props.theme.mainBlue};
  }

  &:hover {
  }
`;

const Box1 = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background: #2da0fa;
  color: ${(props) => props.theme.mainBlack};
  transition: 0.3s;

  &:hover {
    background: #0d6efd;
  }
`;

const AttachmentPage = () => {
  const results = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage }) => state.analyzedMessagesSlice
  );

  const [isWindow, setIsWindow] = useState<boolean>(true);

  return (
    <div>
      <InstructionsWithAttachment />
      <Attachment />
      {Array.isArray(results) && results.length !== 0 && <Summary />}
      {Array.isArray(results) && results.length !== 0 && <WordCloud />}
      {Array.isArray(results) && results.length !== 0 && <ReplyLineGraph />}
    </div>
  );
};

export default AttachmentPage;
