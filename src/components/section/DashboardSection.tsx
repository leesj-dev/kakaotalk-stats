import React, { useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import DashboardContainer from "../organisms/DashboardContainer";
import { useDispatch, useSelector } from "react-redux";
import scrollToEvent from "../../module/common/scrollEvent";
import { AnalyzedMessage, ChatTimes, StringNumberTuple, ValueCountPair } from "../../@types/index.d";
import ChatVolumeByHourlyGraph from "../organisms/graphs/ChatVolumeByHourlyGraph";
import KeywordCloud from "../organisms/graphs/KeywordCloud";
import ReplySpeedGraph from "../organisms/graphs/ReplySpeedGraph";
import ReplyCountByHourlyGraph from "../organisms/graphs/ReplyCountByHourlyGraph";
import ChatRoomCompareGraph from "../organisms/graphs/ChatRoomCompareGraph";
import Span from "../atoms/Span";
import ChatVolumeByPeriodGraph from "../organisms/graphs/ChatVolumeByPeriodGraph";
import ChatRateGraph from "../organisms/graphs/ChatRateGraph";
import KeywordChartGraph from "../organisms/graphs/KeywordChartGraph";
import ChatRatioWithArrowGraph from "../organisms/graphs/ChatRatioWithArrowGraph";

import { getChatTimes, getSpeakers } from "../../module/common/getProperties";
import { getTotalChatCounts } from "../organisms/graphs/SummaryPieGraph";
import { setSelectedSpeakerIndex } from "../../store/reducer/selectedSpeakerIndexSlice";

const DashboardTemplateContainer = styled.div`
  padding: 10px;
  gap: 10px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  text-align: center;
  border: 1px solid #000;
  background: ${(props) => props.theme.mainBlue};
  * {
    border-radius: 12px;
  }
  > :nth-child(1) {
    width: 20%;
  }
  > :nth-child(2) {
    width: 80%;
  }
`;
const AsideBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  > * {
    background: ${(props) => props.theme.mainWhite};
  }
  > :nth-child(1) {
    width: 100%;
    height: 33%;
  }
  > :nth-child(2) {
    width: 100%;
    height: 33%;
  }
  > :nth-child(3) {
    width: 100%;
    height: 33%;
  }
`;
const ArticleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  > :nth-child(1) {
    height: 15%;
    /* background-color: #f00; */
  }
  > :nth-child(2) {
    height: 85%;
  }
`;
const HeadBox = styled.div`
  display: flex;
  gap: 10px;

  > * {
    background: ${(props) => props.theme.mainWhite};
    padding: 10px 20px 0px 15px;
    text-align: left;
  }
  > :nth-child(1) {
    flex: 2;
    flex-direction: row;
    justify-content: space-between;
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
  > :nth-child(5) {
    flex: 1;
  }
`;

const BodyBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  > :nth-child(2) {
    > :nth-child(1) {
      width: 60%;
    }
    > :nth-child(2) {
      width: 40%;
    }
  }
`;

const VerticalBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 10px;
  > * {
    width: 100%;
  }
  > :nth-child(1) {
    background: ${(props) => props.theme.mainWhite};
  }
`;
const HorizontalBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  > * {
    width: 100%;
    background: ${(props) => props.theme.mainWhite};
  }
`;

const TempGraphBox = styled.div`
  height: 100%;
  padding: 10px;
  margin: 0 auto;
`;

const SpeakerSelect = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  align-items: flex-end;
`;

const DashboardSection = () => {
  const dispatch = useDispatch();
  const results = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage }) => state.analyzedMessagesSlice
  );

  const analyzedMessages = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );
  const mostChattedTimes = useSelector(
    (state: { mostChattedTimesSlice: StringNumberTuple[] }) => state.mostChattedTimesSlice
  );

  const selectedSpeakerIndex = useSelector(
    (state: { selectedSpeakerIndexSlice: number }) => state.selectedSpeakerIndexSlice
  );

  const speakers: string[][] = getSpeakers(analyzedMessages);
  const chatTimes: ChatTimes[][][] = getChatTimes(analyzedMessages);
  const totalChatCounts: number[] = getTotalChatCounts(chatTimes);

  const handleChangeSpeaker = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "전체") {
      dispatch(setSelectedSpeakerIndex(Number(e.target.value)));
    } else {
      dispatch(setSelectedSpeakerIndex(-1));
    }
  };

  useEffect(() => {
    scrollToEvent(0, "auto");
  }, []);

  return (
    <DashboardTemplateContainer>
      <AsideBox>
        <TempGraphBox>
          {Array.isArray(results) && results.length !== 0 && <ChatRoomCompareGraph />}
        </TempGraphBox>
        <TempGraphBox>
          {Array.isArray(results) && results.length !== 0 && <ChatVolumeByPeriodGraph />}
        </TempGraphBox>
        <TempGraphBox>
          {Array.isArray(results) && results.length !== 0 && <ChatRateGraph />}
        </TempGraphBox>
      </AsideBox>
      <ArticleBox>
        <HeadBox>
          <DashboardContainer>
            <div>
              <Span color="#7e848a">대화 비율</Span>
              {Array.isArray(results) && results.length !== 0 && <ChatRatioWithArrowGraph />}
            </div>
            <SpeakerSelect>
              <Span color="#7e848a">강조할 대화자</Span>

              <select
                value={selectedSpeakerIndex === -1 ? "전체" : selectedSpeakerIndex}
                onChange={handleChangeSpeaker}
              >
                <option value="전체" key="전체">
                  전체
                </option>

                {speakers[selectedChatRoomIndex]?.map((speaker, index) => {
                  const displayName = speaker.length > 6 ? speaker.substring(0, 6) + "..." : speaker;
                  return (
                    <option value={index} key={index}>
                      {displayName}
                    </option>
                  );
                })}
              </select>

              <Span fontSize="11px" color="#0D6EFD">
                각 대화자의 분석이 가능합니다
              </Span>
            </SpeakerSelect>
          </DashboardContainer>
          <DashboardContainer>
            <Span color="#7e848a">대화자 수</Span>
            <Span fontSize="24px" fontWeight="bold" textAlign="right">
              {speakers[selectedChatRoomIndex]?.length || 0}
            </Span>
          </DashboardContainer>
          <DashboardContainer>
            <Span color="#7e848a">총 대화수</Span>
            <Span fontSize="24px" fontWeight="bold" textAlign="right">
              {totalChatCounts[selectedChatRoomIndex]?.toLocaleString() || 0}
            </Span>
          </DashboardContainer>

          <DashboardContainer>
            <Span color="#7e848a">주로 대화 시간대</Span>
            <Span fontSize="24px" fontWeight="bold" textAlign="right">
              {mostChattedTimes[selectedChatRoomIndex]?.[0]?.[0] || 0}시
            </Span>
          </DashboardContainer>
        </HeadBox>
        <BodyBox>
          <VerticalBox>
            <TempGraphBox>
              {Array.isArray(results) && results.length !== 0 && <ReplySpeedGraph />}
            </TempGraphBox>
          </VerticalBox>
          <VerticalBox>
            <HorizontalBox>
              <TempGraphBox>
                {Array.isArray(results) && results.length !== 0 && <ChatVolumeByHourlyGraph />}
              </TempGraphBox>
            </HorizontalBox>
            <HorizontalBox>
              <TempGraphBox>
                {Array.isArray(results) && results.length !== 0 && <ReplyCountByHourlyGraph />}
              </TempGraphBox>
              <TempGraphBox>
                {Array.isArray(results) && results.length !== 0 && <KeywordChartGraph />}
              </TempGraphBox>
            </HorizontalBox>
          </VerticalBox>
        </BodyBox>
      </ArticleBox>
    </DashboardTemplateContainer>
  );
};

export default DashboardSection;
