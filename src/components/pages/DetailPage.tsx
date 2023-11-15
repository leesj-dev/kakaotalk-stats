import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import scrollToEvent from "../../module/common/scrollToEvent";
import DashboardSideMenu from "../sections/dashboard/DashboardSideMenu";
import ModalGraph from "../organisms/dashboard/ModalGraph";
import { setVolumeHourlyBoxSize } from "../../store/reducer/dashboard/volumeHourlyBoxSizeSlice";
import { FlexColumnDiv } from "../atoms/FlexDiv";
import { AnalyzedMessage } from "../../@types/index.d";
import { getGraphContentData } from "../organisms/dashboard/GraphDisplay";

const GraphDetailContainer = styled.div`
  position: relative;
  margin-top: 80px;
  display: flex;
  width: 100%;
  background: var(--mainBackground);
  transition: background 0.3s;
  @media (max-width: 768px) {
    margin-top: 70px;
  }
`;

const ContentBox = styled(FlexColumnDiv)`
  width: calc(85% - 30px);
  @media (max-width: 1200px) {
    width: calc(100% - 30px);
  }
`;

const GraphBox = styled.div`
  margin: 15px;
  height: 70vh;
  width: 100%;
  gap: 30px;
  > :nth-child(1) {
    background: var(--modalBackground);
  }
  @media (max-width: 768px) {
    height: 70vh;
  }
`;

const DetailPage = () => {
  const dispatch = useDispatch();

  const modalRef = useRef<HTMLDivElement | null>(null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isAnalyzedMessagesExist = useSelector(
    (state: { isAnalyzedMessagesExistSlice: boolean }) => state.isAnalyzedMessagesExistSlice
  );
  const analyzedMessages = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );

  useEffect(() => {
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

  const dispatchVolumeHourlyBoxSize = () => {
    if (!modalRef?.current?.offsetHeight) {
      return;
    }
    if (windowWidth > 1200) {
      return dispatch(
        setVolumeHourlyBoxSize([
          (modalRef?.current?.offsetWidth * 3) / 4,
          modalRef?.current?.offsetHeight,
        ])
      );
    }
    return dispatch(
      setVolumeHourlyBoxSize([modalRef?.current?.offsetWidth, modalRef?.current?.offsetHeight])
    );
  };

  useEffect(() => {
    dispatchVolumeHourlyBoxSize();
  }, []);

  const graphContentData = getGraphContentData({ analyzedMessages, selectedChatRoomIndex });

  return (
    <GraphDetailContainer>
      {windowWidth > 1200 && (
        <DashboardSideMenu
          analyzedMessages={analyzedMessages}
          selectedChatRoomIndex={selectedChatRoomIndex}
        />
      )}
      <ContentBox>
        {isAnalyzedMessagesExist &&
          graphContentData.slice(1).map((item) => {
            return (
              <GraphBox key={item.id} ref={modalRef}>
                <ModalGraph
                  analyzedMessages={analyzedMessages}
                  selectedChatRoomIndex={selectedChatRoomIndex}
                  currentModalData={item}
                />
              </GraphBox>
            );
          })}
      </ContentBox>
    </GraphDetailContainer>
  );
};

export default DetailPage;
