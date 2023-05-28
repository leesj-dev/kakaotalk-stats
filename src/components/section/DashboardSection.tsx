import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import styled from "styled-components";
import DashboardContainer from "../organisms/DashboardContainer";
import { useDispatch, useSelector } from "react-redux";
import scrollToEvent from "../../module/common/scrollEvent";
import { AnalyzedMessage, ChatTimes, StringNumberTuple } from "../../@types/index.d";
import ChatVolumeByHourlyGraph from "../organisms/graphs/ChatVolumeByHourlyGraph";
import ReplySpeedGraph from "../organisms/graphs/ReplySpeedGraph";
import ReplyCountByHourlyGraph from "../organisms/graphs/ReplyCountByHourlyGraph";
import KeywordChartGraph from "../organisms/graphs/KeywordChartGraph";
import ChatRatioWithArrowGraph from "../organisms/graphs/ChatRatioWithArrowGraph";

import { getChatTimes, getSpeakers } from "../../module/common/getProperties";
import { getTotalChatCounts } from "../organisms/graphs/SummaryPieGraph";
import DetailGraphModalForSquare from "../organisms/DetailGraphModalForSquare";
import ChatRoomCompareGraph from "../organisms/graphs/ChatRoomCompareGraph";
import ChatVolumeByPeriodGraph from "../organisms/graphs/ChatVolumeByPeriodGraph";
import ChatRateGraph from "../organisms/graphs/ChatRateGraph";
import GraphDisplay from "../organisms/GraphDisplay";
import DashboardHeaderContent from "../molecules/DashboardHeaderContent";
import { setVolumeHourlyBoxSize } from "../../store/reducer/volumeHourlyBoxSizeSlice";
import SpeakerSelect from "../atoms/SpeakerSelect";

const DashboardTemplateContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  text-align: center;
  gap: 10px;
  height: calc(100vh - 80px);
  width: 100%;
  border: 1px solid #000;
  background: ${(props) => props.theme.mainBlue};
`;

const AsideBox = styled.div`
  height: 100%;
  width: 25%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  > * {
    height: 33.333%;
  }
`;

const ArticleBox = styled.div`
  height: 100%;
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HeadBox = styled.div`
  display: flex;
  gap: 10px;
  height: 15%;

  > * {
    background: ${(props) => props.theme.mainWhite};
    padding: 10px 20px 0px 15px;
    text-align: left;
    border-radius: 15px;
    flex: 1;
  }
  > :nth-child(1) {
    flex: 2;
    flex-direction: row;

    /* 대화자 선택 그래프 */
    > :nth-child(1) {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }
`;

const BodyBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 85%;
  gap: 10px;

  > :nth-child(1) {
    height: 50%;
  }
  > :nth-child(2) {
    height: 50%;

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
  gap: 10px;
`;

const HorizontalBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentModalData, setCurrentModalData] = useState<any>();

  const speakers: string[][] = getSpeakers(analyzedMessages);
  const chatTimes: ChatTimes[][][] = getChatTimes(analyzedMessages);
  const totalChatCounts: number[] = getTotalChatCounts(chatTimes);

  useEffect(() => {
    scrollToEvent(0, "auto");
  }, []);

  const graphContentData = [
    {
      id: 0,
      subject: "대화 비율",
      graph: <ChatRatioWithArrowGraph />,
      setIsModalVisible,
      setCurrentModalData,
      h3: "대화 참여자별 대화량의 비율을 시각화하여 보여주는 그래프",
      p: "대화에 참여한 각각의 인원이 차지하는 대화량의 비율을 나타냅니다. 이를 통해 어떤 인원이 얼마나 많은 대화를 하였는지, 대화 참여율이 어떻게 되는지 등을 파악할 수 있습니다.",
    },
    {
      id: 1,
      subject: "종합 비교",
      graph: <ChatRoomCompareGraph />,
      setIsModalVisible,
      setCurrentModalData,
      h3: "대화 데이터를 종합적으로 분석한 결과를 시각화하여 보여주는 화면",
      p: "대화 로그 데이터를 종합적으로 분석한 결과를 시각화하여 보여주는 화면입니다. 대화량, 대화 시간대, 답장 속도, 대화 키워드 등 다양한 정보를 종합하여 분석한 결과를 그래프, 차트, 표 등 다양한 방식으로 표시합니다.",
    },
    {
      id: 2,
      subject: "기간 대화량",
      graph: <ChatVolumeByPeriodGraph />,
      setIsModalVisible,
      setCurrentModalData,
      h3: "대화 활동의 기간별 분포에 따라 시각화하여 보여주는 그래프",
      p: "각 기간에 대한 대화량을 시각적으로 표현하여, 대화 활동이 어느 기간에 집중되어 있는지 알 수 있습니다. 이를 통해 특정 기간에 대화가 활발하게 이루어지는 경향이나 트렌드를 파악할 수 있습니다.",
    },
    {
      id: 3,
      subject: "대화 비율",
      graph: <ChatRateGraph />,
      setIsModalVisible,
      setCurrentModalData,
      h3: "대화 참여자별 대화량의 변화를 시간에 따라 시각화하여 보여주는 그래프",
      p: "대화에 참여한 인원들 간의 대화량을 나타냅니다. 이를 통해 각각의 인원이 대화에 얼마나 기여하였는지, 대화량이 많은 인원이 어느 정도인지 등을 파악할 수 있습니다.",
    },
    {
      id: 4,
      subject: "시간대별 답장 횟수",
      graph: <ReplyCountByHourlyGraph />,
      setIsModalVisible,
      setCurrentModalData,
      h3: "시간대별로 답장 횟수를 시각화하여 보여주는 그래프",
      p: "각 시간대에 대한 답장 횟수를 시각적으로 표현하여, 대화가 어떤 시간대에 집중되어 있는지 알 수 있습니다. 이를 통해 특정 시간대에 대화가 활발하게 이루어지는 경향이나 패턴을 파악할 수 있습니다. ",
    },

    {
      id: 5,
      subject: "키워드",
      graph: <KeywordChartGraph />,
      setIsModalVisible,
      setCurrentModalData,
      h3: "대화 내용에서 빈도수가 높은 단어를 추출하여 시각화하여 보여주는 워드 클라우드",
      p: "대화 내용에서 자주 등장하는 단어나 문구를 나타냅니다. 이를 통해 대화의 주요 주제나 키워드를 파악할 수 있으며, 이를 활용하여 대화의 내용을 더욱 효율적으로 파악하고 관리할 수 있습니다.",
    },
    {
      id: 6,
      subject: "답장속도",
      graph: <ReplySpeedGraph />,
      setIsModalVisible,
      setCurrentModalData,
      h3: "대화 참여자별  평균 답장 속도를 시각화하여 보여주는 그래프",
      p: "상대방이 보낸 메시지에 대한 본인의 답장 속도를 나타냅니다. 이를 통해 메시지에 대한 대응속도가 어느정도인지, 더 빠른 대응이 필요한 상황이 있는지 등을 파악할 수 있습니다.",
    },
    {
      id: 7,
      subject: "시간대별 대화량",
      graph: <ChatVolumeByHourlyGraph />,
      setIsModalVisible,
      setCurrentModalData,
      h3: "대화가 활발히 이루어진 시간대를 시각화하여 보여주는 그래프",
      p: "대화가 발생한 시간대를 나타냅니다. 이를 통해 대화가 활발히 이루어지는 시간대, 그리고 상대방과의 대화 타이밍을 파악할 수 있습니다.",
    },
  ];

  const HeaderData = [
    {
      id: "speakerCount",
      headerTitle: "대화자 수",
      headerContent: ` ${speakers[selectedChatRoomIndex]?.length || 0}`,
    },
    {
      id: "totalChatCount",
      headerTitle: "총 대화수",
      headerContent: `${totalChatCounts[selectedChatRoomIndex]?.toLocaleString() || 0}`,
    },
    {
      id: "mostChatTime",
      headerTitle: "주 대화 시간대",
      headerContent: `${mostChattedTimes[selectedChatRoomIndex]?.[0]?.[0] || 0}` + "시",
    },
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);

  if (containerRef?.current?.offsetHeight) {
    dispatch(
      setVolumeHourlyBoxSize([containerRef?.current?.offsetWidth, containerRef?.current?.offsetHeight])
    );
  }

  return (
    <DashboardTemplateContainer>
      <AsideBox>
        {graphContentData.slice(1, 4).map((data) => {
          return <GraphDisplay data={data} key={data.id} />;
        })}
      </AsideBox>
      <ArticleBox>
        <HeadBox>
          <DashboardContainer>
            <GraphDisplay data={graphContentData[0]} />
            <SpeakerSelect />
          </DashboardContainer>
          {HeaderData.map((data) => {
            return (
              <DashboardContainer key={data.id}>
                <DashboardHeaderContent data={data} key={data.id} />
              </DashboardContainer>
            );
          })}
        </HeadBox>
        <BodyBox>
          <VerticalBox>
            <GraphDisplay data={graphContentData[6]} />
          </VerticalBox>
          <VerticalBox>
            <HorizontalBox ref={containerRef}>
              <GraphDisplay data={graphContentData[7]} />
            </HorizontalBox>
            <HorizontalBox>
              {graphContentData.slice(4, 6).map((data) => {
                return <GraphDisplay data={data} key={data.id} />;
              })}
            </HorizontalBox>
          </VerticalBox>
        </BodyBox>
      </ArticleBox>
      {isModalVisible && (
        <DetailGraphModalForSquare
          setIsModalVisible={setIsModalVisible}
          currentModalData={currentModalData}
          setCurrentModalData={setCurrentModalData}
        />
      )}
    </DashboardTemplateContainer>
  );
};

export default DashboardSection;
