import React, { useEffect } from "react";
import styled from "styled-components";
import DashboardContainer from "../organisms/DashboardContainer";
import { useSelector } from "react-redux";
import scrollToEvent from "../../module/common/scrollEvent";
import { AnalyzedMessage } from "../../@types/index.d";
import ChatRatioGraph from "../organisms/graphs/ChatRatioGraph";
import TimezoneGraph from "../organisms/graphs/TimezoneGraph";
import KeywordCloud from "../organisms/graphs/KeywordCloud";
import ReplyLineGraph from "../organisms/graphs/ReplyLineGraph";
import PeriodRatioGraph from "../organisms/graphs/PeriodRatioGraph";

const DashboardTemplateContainer = styled.div`
  margin: 100px;
  margin-bottom: 500px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 30px;
  border: 1px solid #000;

  * {
    border-radius: 30px;
  }
`;

const HeadBox = styled.div`
  display: flex;
  gap: 30px;

  > * {
    height: 20vh;
    background: #86c3ff;
  }
  > :nth-child(1) {
    flex: 3;
  }
  > :nth-child(2) {
    flex: 1;
  }
  > :nth-child(3) {
    flex: 3;
  }
`;

const BodyBox = styled.div`
  display: flex;
  gap: 30px;

  > * {
    height: 80vh;
  }
  > :nth-child(1) {
    flex: 1;
  }
  > :nth-child(2) {
    flex: 5;
  }
`;

const SideVerticalBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  > * {
    background: #86c3ff;
    flex: 2;
  }
  > :nth-child(4) {
    flex: 3;
  }
`;

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  > :nth-child(1) {
    flex: 4;
  }
  > :nth-child(2) {
    flex: 3;
  }
`;

const MainColumnTop = styled.div`
  display: flex;
  gap: 30px;

  > * {
    background: #86c3ff;
    flex: 1;
  }
`;
const MainColumnBottom = styled.div`
  display: flex;
  gap: 30px;

  > * {
    background: #86c3ff;
  }
  > :nth-child(1) {
    flex: 1;
  }
  > :nth-child(2) {
    flex: 2;
  }
`;

const DashboardTemplate = () => {
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
      </HeadBox>
      <BodyBox>
        <SideVerticalBox>
          <DashboardContainer>사이드1</DashboardContainer>
          <DashboardContainer>사이드2</DashboardContainer>
          <DashboardContainer>사이드3</DashboardContainer>
          <DashboardContainer>사이드4</DashboardContainer>
        </SideVerticalBox>
        <MainBox>
          <MainColumnTop>
            <DashboardContainer>
              {Array.isArray(results) && results.length !== 0 && <PeriodRatioGraph />}
            </DashboardContainer>
            <DashboardContainer>
              {Array.isArray(results) && results.length !== 0 && <TimezoneGraph />}
            </DashboardContainer>
          </MainColumnTop>
          <MainColumnBottom>
            <DashboardContainer>
              {Array.isArray(results) && results.length !== 0 && <KeywordCloud />}
            </DashboardContainer>
            <DashboardContainer>
              {Array.isArray(results) && results.length !== 0 && <ReplyLineGraph />}
            </DashboardContainer>
          </MainColumnBottom>
        </MainBox>
      </BodyBox>
    </DashboardTemplateContainer>
  );
};

export default DashboardTemplate;
