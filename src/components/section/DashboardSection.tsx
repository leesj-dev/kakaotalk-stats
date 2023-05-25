import React, { useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import DashboardContainer from "../organisms/DashboardContainer";
import { useDispatch, useSelector } from "react-redux";
import scrollToEvent from "../../module/common/scrollEvent";
import { AnalyzedMessage, ChatTimes, StringNumberTuple } from "../../@types/index.d";
import ChatVolumeByHourlyGraph from "../organisms/graphs/ChatVolumeByHourlyGraph";
import ReplySpeedGraph from "../organisms/graphs/ReplySpeedGraph";
import ReplyCountByHourlyGraph from "../organisms/graphs/ReplyCountByHourlyGraph";
import Span from "../atoms/Span";
import KeywordChartGraph from "../organisms/graphs/KeywordChartGraph";
import ChatRatioWithArrowGraph from "../organisms/graphs/ChatRatioWithArrowGraph";

import { getChatTimes, getSpeakers } from "../../module/common/getProperties";
import { getTotalChatCounts } from "../organisms/graphs/SummaryPieGraph";
import { setSelectedSpeakerIndex } from "../../store/reducer/selectedSpeakerIndexSlice";
import ChatRoomCompareGraph from "../organisms/graphs/ChatRoomCompareGraph";
import ChatVolumeByPeriodGraph from "../organisms/graphs/ChatVolumeByPeriodGraph";
import ChatRateGraph from "../organisms/graphs/ChatRateGraph";
import GraphBox from "../organisms/GraphBox";
import DashboardHeaderContent from "../molecules/DashboardHeaderContent";

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

const SpeakerSelect = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  align-items: flex-end;
`;

const AsideGraphContent = styled.div`
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

const DashboardSection = () => {
  const dispatch = useDispatch();

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

  const asideContent = [
    {
      id: "레이더",
      message: "종합 비교",
      graph: <ChatRoomCompareGraph />,
    },
    {
      id: "바",
      message: "기간 대화량",
      graph: <ChatVolumeByPeriodGraph />,
    },
    {
      id: "에어리어",
      message: "대화 비율",
      graph: <ChatRateGraph />,
    },
  ];
  const horizontalBoxContent = [
    {
      id: "라인",
      message: "시간대별 답장 횟수",
      graph: <ReplyCountByHourlyGraph />,
    },
    {
      id: "바",
      message: "키워드",
      graph: <KeywordChartGraph />,
    },
  ];
  const HeaderData = [
    {
      id: 1,
      headerTitle: "대화자 수",
      headercontent: ` ${speakers[selectedChatRoomIndex]?.length || 0}`,
    },
    {
      id: 2,
      headerTitle: "총 대화수",
      headercontent: `${totalChatCounts[selectedChatRoomIndex]?.toLocaleString() || 0}`,
    },
    {
      id: 3,
      headerTitle: "주 대화 시간대",
      headercontent: `${mostChattedTimes[selectedChatRoomIndex]?.[0]?.[0] || 0}` + "시",
    },
  ];
  return (
    <DashboardTemplateContainer>
      <AsideGraphContent>
        {asideContent.map((data) => {
          return <GraphBox data={data} key={data.id} />;
        })}
      </AsideGraphContent>
      <ArticleBox>
        <HeadBox>
          <DashboardContainer>
            <GraphBox data={{ id: "파이", message: "대화 비율", graph: <ChatRatioWithArrowGraph /> }} />

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

          {HeaderData.length > 0 &&
            HeaderData.map((data) => {
              return (
                <DashboardContainer>
                  <DashboardHeaderContent data={data} key={data.id} />
                </DashboardContainer>
              );
            })}
        </HeadBox>
        <BodyBox>
          <VerticalBox>
            <GraphBox data={{ id: "라인", message: "답장속도", graph: <ReplySpeedGraph /> }} />
          </VerticalBox>
          <VerticalBox>
            <HorizontalBox>
              <GraphBox
                data={{ id: "버블", message: "시간대별 대화량", graph: <ChatVolumeByHourlyGraph /> }}
              />
            </HorizontalBox>
            <HorizontalBox>
              {horizontalBoxContent.map((data) => {
                return <GraphBox data={data} key={data.id} />;
              })}
            </HorizontalBox>
          </VerticalBox>
        </BodyBox>
      </ArticleBox>
    </DashboardTemplateContainer>
  );
};

export default DashboardSection;
