import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Span from "../../atoms/Span";
import Icon from "../../atoms/Icon";
import { useLocation } from "react-router";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AnalyzedMessage } from "../../../@types/index.d";
import { getDates } from "../../../module/common/getProperties";
import { setIsModalVisible } from "../../../store/reducer/dashboard/isModalVisibleSlice";
import { graphContentData } from "../../pages/DetailPage";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FlexCenterDiv, FlexColumnCenterDiv, FlexColumnDiv } from "../../atoms/FlexDiv";
import Paragraph from "../../atoms/Paragraph";
import { setVolumeHourlyBoxSize } from "../../../store/reducer/dashboard/volumeHourlyBoxSizeSlice";
import SpeakerSelectContent from "./SpeakerSelectContent";
import { borderRadius } from "../../../style/specifiedCss/borderRadius";

const ModalGraphBox = styled.div`
  padding: 20px 20px 30px 20px;
  width: 100%;
  height: 100%;
  background: var(--modalBackground);
  backdrop-filter: blur(80px);
  box-shadow: 2px 2px 8px -3px var(--mainBlack);
  border-radius: ${borderRadius.medium};
`;

const CloseModalIcon = styled(Icon)`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 24px;
  color: var(--mainText);
  cursor: pointer;
`;

const ContentBox = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
  height: 100%;
`;

const GraphContentBox = styled.div`
  position: relative;
  width: 75%;
  height: 100%;
`;

const DescriptionBox = styled(FlexColumnDiv)`
  padding: 10px 0px 10px 15px;
  width: 25%;
  height: 100%;
`;

const InfoContentBox = styled(FlexColumnDiv)`
  gap: 5px;
`;

const SubjectBox = styled(FlexCenterDiv)<{ isDetailPage?: boolean }>`
  justify-content: space-between;
  min-height: 60px;
  > * {
    display: flex;
    align-items: center;
    height: 40px;
  }

  @media (max-width: 1200px) {
    width: 220px;
    justify-content: ${(props) => props.isDetailPage && "start"};
  }
  @media (max-width: 480px) {
    width: 100%;
    height: 22px;
  }
`;

const SubjectSpan = styled(Span)`
  font-weight: 500;
  font-size: 2.6rem;
`;

const FlipModalGraphIcon = styled(Icon)`
  font-size: 2.4rem;
  cursor: pointer;
`;

const PeriodBox = styled(FlexColumnCenterDiv)`
  margin-bottom: 10px;
  padding: 10px 0;
  font-size: 16px;
  color: var(--mainText);
  border-top: 1px solid var(--mainGray);
  border-bottom: 1px solid var(--mainGray);
  font-weight: 500;
`;

const DescriptionParagraph = styled(Paragraph)`
  text-align: start;
  font-size: 1.8rem;
  line-height: 1.2;
  word-break: keep-all;
  width: 100%;
  height: 100%;
`;

const ResponsiveContentBox = styled(FlexColumnDiv)`
  width: 100%;
  height: 100%;
  gap: 15px;
`;

const ResponsiveHeadBox = styled(FlexCenterDiv)`
  padding: 0 10px;
  flex: 1;
  height: 100%;
  > * {
    flex: 1;
    height: 100%;
  }
`;

const ResponsivePeriodBox = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

const ResponsiveSubjectBox = styled(FlexColumnDiv)`
  align-items: start;
  justify-content: center;
`;

const ResponsiveGraphContentBox = styled.div`
  position: relative;
  flex: 6;
  height: calc(100% - 119px);
  width: 100%;
`;

interface ModalGraphProps {
  currentModalData: {
    id?: number;
    subject?: string;
    graph: any;
    h2: string;
    h3: string;
    p: string;
    fontSize?: any;
  };
  modalSetProps?: (data: any) => void;
}

const findModalDataById = (id: number) => {
  if (id === 0) {
    return graphContentData.find((item) => item.id === graphContentData.length);
  } else if (id > graphContentData.length) {
    return graphContentData.find((item) => item.id === 1);
  } else {
    return graphContentData.find((item) => item.id === id);
  }
};

let chatDates: any;
let datePickerPeriodData: any;

const ModalGraph = ({ currentModalData, modalSetProps }: ModalGraphProps) => {
  const isDetailPage = useLocation().pathname.includes("detail");

  const dispatch = useDispatch();

  const modalRef = useRef<HTMLDivElement | null>(null);

  const { subject, graph, h2, p } = currentModalData;

  const results = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );

  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  if (!chatDates) {
    chatDates = getDates(results)[selectedChatRoomIndex];
    datePickerPeriodData = [chatDates.flat()[0], chatDates.flat().slice(-1)[0]];
  }

  const handleClickCloseModalButton = () => {
    setIsModalVisible && dispatch(setIsModalVisible(false));
  };

  const handleClickFlipIcon = (nextId: number) => {
    const toFlipModalData = findModalDataById(nextId);
    if (modalSetProps && toFlipModalData) {
      modalSetProps(toFlipModalData);
    }
  };

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    if (modalRef?.current?.offsetHeight) {
      dispatch(
        setVolumeHourlyBoxSize([
          (modalRef?.current?.offsetWidth * 3) / 4,
          modalRef?.current?.offsetHeight,
        ])
      );
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);

  return (
    <ModalGraphBox className="GraphContentBox" ref={modalRef}>
      {!isDetailPage && (
        <CloseModalIcon onClick={() => handleClickCloseModalButton()}>
          <MdClose />
        </CloseModalIcon>
      )}
      {screenWidth > 1200 ? (
        <ContentBox>
          <GraphContentBox className="GraphContentBox">{graph}</GraphContentBox>
          <DescriptionBox>
            <InfoContentBox>
              <SubjectBox isDetailPage={isDetailPage}>
                <FlipModalGraphIcon
                  onClick={() => currentModalData.id && handleClickFlipIcon(currentModalData.id - 1)}
                >
                  {!isDetailPage && <BsChevronLeft />}
                </FlipModalGraphIcon>
                <SubjectSpan>{h2}</SubjectSpan>
                <FlipModalGraphIcon
                  onClick={() => currentModalData.id && handleClickFlipIcon(currentModalData.id + 1)}
                >
                  {!isDetailPage && <BsChevronRight />}
                </FlipModalGraphIcon>
              </SubjectBox>
              {subject === "종합 비교" ? null : <SpeakerSelectContent />}
              <PeriodBox>
                {datePickerPeriodData[0]} ~ {datePickerPeriodData[1]}
              </PeriodBox>
            </InfoContentBox>
            <DescriptionParagraph>{p}</DescriptionParagraph>
          </DescriptionBox>
        </ContentBox>
      ) : (
        <ResponsiveContentBox>
          <ResponsiveHeadBox>
            <ResponsiveSubjectBox>
              <ResponsivePeriodBox>
                {datePickerPeriodData[0]} ~ {datePickerPeriodData[1]}
              </ResponsivePeriodBox>
              <SubjectBox isDetailPage={isDetailPage}>
                <FlipModalGraphIcon
                  onClick={() => currentModalData.id && handleClickFlipIcon(currentModalData.id - 1)}
                >
                  {!isDetailPage && <BsChevronLeft />}
                </FlipModalGraphIcon>
                <SubjectSpan>{h2}</SubjectSpan>
                <FlipModalGraphIcon
                  onClick={() => currentModalData.id && handleClickFlipIcon(currentModalData.id + 1)}
                >
                  {!isDetailPage && <BsChevronRight />}
                </FlipModalGraphIcon>
              </SubjectBox>
            </ResponsiveSubjectBox>
            {subject === "종합 비교" ? null : <SpeakerSelectContent />}
          </ResponsiveHeadBox>
          <ResponsiveGraphContentBox className="GraphContentBox">{graph}</ResponsiveGraphContentBox>
        </ResponsiveContentBox>
      )}
    </ModalGraphBox>
  );
};

export default ModalGraph;
