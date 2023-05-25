import React, { useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import DashboardContainer from "../organisms/DashboardContainer";
import { useDispatch, useSelector } from "react-redux";
import scrollToEvent from "../../module/common/scrollEvent";
import { AnalyzedMessage, ChatTimes, StringNumberTuple } from "../../@types/index.d";
import ChatVolumeByHourlyGraph from "../organisms/graphs/ChatVolumeByHourlyGraph";
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
import DetailGraphModalForSquare from "../organisms/DetailGraphModalForSquare";

const DashboardTemplateContainer = styled.div`
  padding: 10px;
  gap: 10px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  text-align: center;
  border: 1px solid #000;
  background: ${(props) => props.theme.mainBlue};

  > :nth-child(1) {
    width: 25%;
  }
  > :nth-child(2) {
    width: 75%;
  }
`;
const AsideBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  > * {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: ${(props) => props.theme.mainWhite};
    border-radius: 12px;
  }
  > :nth-child(1) {
    height: 33.333%;
  }
  > :nth-child(2) {
    height: 33.333%;
  }
  > :nth-child(3) {
    height: 33.333%;
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
    border-radius: 12px;
    flex: 1;
  }
  > :nth-child(1) {
    flex: 2;
    flex-direction: row;
    justify-content: space-between;
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
  > :nth-child(1) {
    width: 100%;
    border-radius: 12px;
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
    border-radius: 12px;
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

const aside전달데이터 = [
  {
    id: "레이더",
    message: "종합비교",
    graph: <ChatRoomCompareGraph />,
  },
  {
    id: "바",
    message: "기간대화량",
    graph: <ChatRoomCompareGraph />,
  },
  {
    id: "에어리어",
    message: "대화비율",
    graph: <ChatRoomCompareGraph />,
  },
];
// <올가니즘 전달데이터={전달데이터}>
//   <TempGraphBox>
//     <Span>{전달데이터.message}</Span>
//     {전달데이터.graph}
//   </TempGraphBox>
// </올가니즘>

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

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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
        {/* {Array.isArray(results) && results.length !== 0 &&  <올가니즘 전달데이터={전달데이터}>} */}

        <TempGraphBox>
          {Array.isArray(results) && results.length !== 0 && <ChatRoomCompareGraph />}
        </TempGraphBox>
        <TempGraphBox>
          <Span>기간 대화량</Span>
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
                <Span>키워드</Span>
                {Array.isArray(results) && results.length !== 0 && <KeywordChartGraph />}
              </TempGraphBox>
            </HorizontalBox>
          </VerticalBox>
        </BodyBox>
      </ArticleBox>
      {isModalVisible && <DetailGraphModalForSquare setIsModalVisible={setIsModalVisible} />}
    </DashboardTemplateContainer>
  );
};

export default DashboardSection;
