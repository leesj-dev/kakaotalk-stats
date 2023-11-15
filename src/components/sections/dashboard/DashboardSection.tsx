import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import scrollToEvent from "../../../module/common/scrollToEvent";
import { GraphPropsInterface, StringNumberTuple } from "../../../@types/index.d";
import ModalGraph from "../../organisms/dashboard/ModalGraph";
import GraphDisplay from "../../organisms/dashboard/GraphDisplay";
import { setVolumeHourlyBoxSize } from "../../../store/reducer/dashboard/volumeHourlyBoxSizeSlice";
import { setIsModalVisible } from "../../../store/reducer/dashboard/isModalVisibleSlice";
import { FlexCenterDiv, FlexColumnDiv } from "../../atoms/FlexDiv";
import { zIndex } from "../../../style/specifiedCss/zIndex";
import DashBoardHeader from "../../organisms/dashboard/DashBoardHeader";

const DashboardSectionContainer = styled(FlexCenterDiv)`
  padding: 10px;
  gap: 10px;
  height: calc(100vh - 80px);
  width: 100%;
  background: var(--dashboardBackground);
  transition: background 0.3s;

  @media (max-width: 1200px) {
    height: calc(100vh - 70px);
    min-width: 1180px;
    min-height: 750px;
  }
`;

const AsideBox = styled(FlexColumnDiv)`
  height: 100%;
  width: 25%;
  gap: 10px;

  > * {
    height: calc((100% - 20px) / 3);
  }
`;

const ArticleBox = styled(FlexColumnDiv)`
  height: 100%;
  width: calc(100% - 25% - 10px);
  gap: 10px;
`;

const BodyBox = styled(FlexColumnDiv)`
  gap: 10px;
  height: calc((100% - 10px) * 0.85);
`;

const VerticalBox = styled.div`
  display: flex;
  gap: 10px;
  height: calc((100% - 10px) / 2);
`;

const ReplySpeedGraphBox = styled.div`
  width: 100%;
  height: 100%;
`;

const HorizontalBox = styled(FlexColumnDiv)`
  gap: 10px;
`;

const ReplyCountByHourlyGraphBox = styled(HorizontalBox)`
  width: 60%;
`;

const KeywordGraphBox = styled(HorizontalBox)`
  width: calc(100% - 60% - 10px);
`;

const ModalBox = styled.div`
  position: fixed;
  top: 17%;
  bottom: 10%;
  left: 21%;
  right: 5.5%;
  z-index: ${zIndex.graphModal};
  display: flex;
  @media (max-width: 1200px) {
    left: 5.5%;
  }
`;

const DashboardSection = ({ analyzedMessages, selectedChatRoomIndex }: GraphPropsInterface) => {
  const dispatch = useDispatch();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const isModalVisible = useSelector(
    (state: { isModalVisibleSlice: StringNumberTuple[] }) => state.isModalVisibleSlice
  );

  const [currentModalData, setCurrentModalData] = useState<any>();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  if (!isModalVisible && containerRef?.current?.offsetHeight) {
    dispatch(
      setVolumeHourlyBoxSize([containerRef?.current?.offsetWidth, containerRef?.current?.offsetHeight])
    );
  }

  useEffect(() => {
    dispatch(setIsModalVisible(false));
    scrollToEvent(0, "auto");
  }, []);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (modalRef?.current?.offsetHeight) {
      dispatch(
        setVolumeHourlyBoxSize([
          (modalRef?.current?.offsetWidth * 3) / 4,
          modalRef?.current?.offsetHeight,
        ])
      );
    }
  }, []);

  const createGraphDisplayProps = (subject: string, zIndex: number) => {
    return {
      analyzedMessages,
      selectedChatRoomIndex,
      displaySubject: subject,
      setCurrentModalData: setCurrentModalData,
      zIndex,
    };
  };

  return (
    <DashboardSectionContainer>
      <AsideBox>
        <GraphDisplay {...createGraphDisplayProps("종합 비교", 1)} />
        <GraphDisplay {...createGraphDisplayProps("기간 대화량", 3)} />
        <GraphDisplay {...createGraphDisplayProps("대화 비율", 2)} />
      </AsideBox>
      <ArticleBox>
        <DashBoardHeader
          {...createGraphDisplayProps("채팅방 대화 비율", 1)}
          createGraphDisplayProps={createGraphDisplayProps}
        />
        <BodyBox>
          <VerticalBox>
            <ReplySpeedGraphBox>
              <GraphDisplay {...createGraphDisplayProps("답장속도", 3)} />
            </ReplySpeedGraphBox>
          </VerticalBox>
          <VerticalBox>
            <ReplyCountByHourlyGraphBox ref={containerRef}>
              <GraphDisplay {...createGraphDisplayProps("시간대별 대화량", 1)} />
            </ReplyCountByHourlyGraphBox>
            <KeywordGraphBox>
              <GraphDisplay {...createGraphDisplayProps("키워드", 1)} />
            </KeywordGraphBox>
          </VerticalBox>
        </BodyBox>
      </ArticleBox>
      {isModalVisible && currentModalData && (
        <ModalBox ref={modalRef}>
          <ModalGraph
            analyzedMessages={analyzedMessages}
            selectedChatRoomIndex={selectedChatRoomIndex}
            currentModalData={currentModalData}
            setCurrentModalData={setCurrentModalData}
          />
        </ModalBox>
      )}
    </DashboardSectionContainer>
  );
};

export default DashboardSection;
