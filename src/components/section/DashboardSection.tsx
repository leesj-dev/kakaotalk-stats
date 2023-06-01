import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import DashboardContainer from "../organisms/DashboardContainer";
import { useDispatch, useSelector } from "react-redux";
import scrollToEvent from "../../module/common/scrollEvent";
import { AnalyzedMessage, ChatTimes, StringNumberTuple } from "../../@types/index.d";
import { getChatTimes, getSpeakers } from "../../module/common/getProperties";
import { getTotalChatCounts } from "../molecules/graphs/SummaryPieGraph";
import ModalGraph from "../organisms/ModalGraph";
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
    flex: 1.3;
    flex-direction: row;
    > :nth-child(1) {
      padding: 0;
    }
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

const ModalBox = styled.div`
  position: fixed;
  top: 100px;
  bottom: 100px;
  left: 200px;
  right: 200px;
  z-index: 999;
  display: flex;
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
      headerContent: `${mostChattedTimes[selectedChatRoomIndex]?.[0]?.[0] || 0}시`,
    },
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);

  if (containerRef?.current?.offsetHeight) {
    dispatch(
      setVolumeHourlyBoxSize([containerRef?.current?.offsetWidth, containerRef?.current?.offsetHeight])
    );
  }

  const modalSetProps = { setIsModalVisible, setCurrentModalData };

  return (
    <DashboardTemplateContainer>
      <AsideBox>
        <GraphDisplay displaySubject={"종합 비교"} modalSetProps={modalSetProps} />
        <GraphDisplay displaySubject={"기간 대화량"} modalSetProps={modalSetProps} />
        <GraphDisplay displaySubject={"대화 비율"} modalSetProps={modalSetProps} />
      </AsideBox>
      <ArticleBox>
        <HeadBox>
          <DashboardContainer>
            <GraphDisplay displaySubject={"채팅방 대화 비율"} modalSetProps={modalSetProps} />
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
            <GraphDisplay displaySubject={"답장속도"} modalSetProps={modalSetProps} />
          </VerticalBox>
          <VerticalBox>
            <HorizontalBox ref={containerRef}>
              <GraphDisplay displaySubject={"시간대별 대화량"} modalSetProps={modalSetProps} />
            </HorizontalBox>
            <HorizontalBox>
              <GraphDisplay displaySubject={"시간대별 답장 횟수"} modalSetProps={modalSetProps} />
              <GraphDisplay displaySubject={"키워드"} modalSetProps={modalSetProps} />
            </HorizontalBox>
          </VerticalBox>
        </BodyBox>
      </ArticleBox>
      {isModalVisible && (
        <ModalBox>
          <ModalGraph setIsModalVisible={setIsModalVisible} currentModalData={currentModalData} />
        </ModalBox>
      )}
    </DashboardTemplateContainer>
  );
};

export default DashboardSection;
