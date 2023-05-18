import React, { useEffect } from "react";
import styled from "styled-components";
import DashboardContainer from "../organisms/DashboardContainer";
import { useSelector } from "react-redux";
import scrollToEvent from "../../module/common/scrollEvent";
import { AnalyzedMessage } from "../../@types/index.d";
import TimezoneGraph from "../organisms/graphs/TimezoneGraph";
import KeywordCloud from "../organisms/graphs/KeywordCloud";
import ReplyLineGraph from "../organisms/graphs/ReplyLineGraph";
import PeriodRatioGraph from "../organisms/graphs/ChatVolumeGraph";
import MostChatTimesGraph from "../organisms/graphs/MostChatTimesGraph";
import SummaryPieGraph from "../organisms/graphs/SummaryPieGraph";
import RadarGraph from "../organisms/graphs/RadarGraph";

const DashboardTemplateContainer = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 30px;
  border: 1px solid #000;
  background: #acffc2;

  * {
    border-radius: 30px;
  }
  > :nth-child(1) {
    background: #f00;
  }
  > :nth-child(2) {
    flex: 1;
    background: #f00;
  }
`;

const HeadBox = styled.div`
  display: flex;
  gap: 30px;

  > * {
    background: #86c3ff;
  }
  > :nth-child(1) {
    flex: 2;
  }
  > :nth-child(2) {
    flex: 1;
  }
  > :nth-child(3) {
    flex: 1;
  }
  > :nth-child(4) {
    flex: 1;
  }
`;

const BodyBox = styled.div`
  display: flex;
  gap: 30px;

  > * {
    flex: 1;
  }
`;

const VerticalBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  > * {
    background: #86c3ff;
    flex: 2;
  }
  > :nth-child(1) {
    flex: 3;
  }
  > :nth-child(2) {
    flex: 2;
  }
`;

const TempGraphBox = styled.div`
  height: 500px;
`;

const DashboardSection = () => {
  const results = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage }) => state.analyzedMessagesSlice
  );

  useEffect(() => {
    scrollToEvent(0, "auto");
  }, []);
  return (
    <DashboardTemplateContainer>
      <HeadBox>
        <DashboardContainer>헤드1</DashboardContainer>
        <DashboardContainer>헤드2</DashboardContainer>
        <DashboardContainer>헤드3</DashboardContainer>
        <DashboardContainer>헤드4</DashboardContainer>
      </HeadBox>
      <BodyBox>
        <VerticalBox>
          <DashboardContainer>바디1</DashboardContainer>
          <DashboardContainer>바디2</DashboardContainer>
        </VerticalBox>
        <VerticalBox>
          <DashboardContainer>바디1</DashboardContainer>
        </VerticalBox>
        <VerticalBox>
          <DashboardContainer>바디1</DashboardContainer>
          <DashboardContainer>바디2</DashboardContainer>
        </VerticalBox>
      </BodyBox>
      <TempGraphBox>{Array.isArray(results) && results.length !== 0 && <RadarGraph />}</TempGraphBox>
    </DashboardTemplateContainer>
  );
};

export default DashboardSection;
