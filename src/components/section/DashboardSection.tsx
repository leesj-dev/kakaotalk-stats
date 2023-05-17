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
import Span from "../atoms/Span";

const DashboardTemplateContainer = styled.div`
  padding: 50px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  text-align: center;
  gap: 20px;
  border: 1px solid #000;
  background: #acffc2;

  * {
    border-radius: 19px;
  }
  > :nth-child(1) {
    flex: 1;
  }
  > :nth-child(2) {
    flex: 2.5;
  }
`;
const AsideBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  > * {
    background: ${(props) => props.theme.mainWhite};
  }
  > :nth-child(1) {
    flex: 1;
  }
  > :nth-child(2) {
    flex: 1;
  }
  > :nth-child(3) {
    flex: 1;
  }
`;
const ArticleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  > :nth-child(1) {
    flex: 1;
  }
  > :nth-child(2) {
    flex: 4;
  }
`;
const HeadBox = styled.div`
  display: flex;
  gap: 20px;

  > * {
    background: ${(props) => props.theme.mainWhite};
    padding: 20px 30px;
    text-align: left;
  }
  > :nth-child(1) {
    flex: 1;
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
  gap: 20px;

  > * {
    flex: 1;
  }
`;

const VerticalBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  > * {
    background: ${(props) => props.theme.mainWhite};
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
      {" "}
      <AsideBox>
        <DashboardContainer>어사이드1</DashboardContainer>
        <DashboardContainer>어사이드2</DashboardContainer>
        <DashboardContainer>어사이드3</DashboardContainer>
      </AsideBox>
      <ArticleBox>
        <HeadBox>
          <DashboardContainer>
            <Span color="#7e848a">총 대화수</Span>
            <Span fontSize="24px" fontWeight="bold" textAlign="right">
              12341231
            </Span>
          </DashboardContainer>
          <DashboardContainer>
            <Span color="#7e848a">대화자 수</Span>
            <Span fontSize="24px" fontWeight="bold" textAlign="right">
              3
            </Span>
          </DashboardContainer>
          <DashboardContainer>
            <Span color="#7e848a">대화자 [답장속도]</Span>
            <Span fontSize="24px" fontWeight="bold" textAlign="right">
              영한
            </Span>
          </DashboardContainer>
          <DashboardContainer>
            <Span color="#7e848a">주로 대화 시간대</Span>
            <Span fontSize="24px" fontWeight="bold" textAlign="right">
              20시
            </Span>
          </DashboardContainer>
        </HeadBox>
        <BodyBox>
          <VerticalBox>
            <DashboardContainer>바디1</DashboardContainer>
          </VerticalBox>
          <VerticalBox>
            <DashboardContainer>바디1</DashboardContainer>
            <DashboardContainer>바디2</DashboardContainer>
          </VerticalBox>
        </BodyBox>
      </ArticleBox>
      {/* 
      <TempGraphBox>
        {Array.isArray(results) && results.length !== 0 && <SummaryPieGraph />}
      </TempGraphBox> */}
    </DashboardTemplateContainer>
  );
};

export default DashboardSection;
