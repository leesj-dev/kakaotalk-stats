import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Span from "../atoms/Span";
import Icon from "../atoms/Icon";
import ChatRatioWithArrowGraph from "../molecules/graphs/ChatRatioWithArrowGraph";
import SpeakerSelect from "../molecules/SpeakerSelect";
import CardContent from "../molecules/CardContent";
import { useLocation } from "react-router";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AnalyzedMessage } from "../../@types/index.d";
import { getChatTimes, getDates } from "../../module/common/getProperties";
import { setSelectedChatRoomIndex } from "../../store/reducer/selectedRoomIndexSlice";
import { setIsModalVisible } from "../../store/reducer/isModalVisibleSlice";

const ModalGraphBox = styled.div`
  padding: 30px;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.modalBackground};
  backdrop-filter: blur(80px);
  box-shadow: 2px 2px 8px -3px ${(props) => props.theme.mainBlack};
  border-radius: 15px;
`;

const CloseModalBox = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  color: ${(props) => props.theme.mainText};
  > :nth-child(1) {
    cursor: pointer;
  }
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
  /* background: #ff00ff15; */
`;

const DescriptionBox = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 30px;
  background-color: ${(props) => props.theme.modalContentBackground};
  border: 1px solid #ddd;
  border-radius: 15px;
`;

const InfoContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SpeakerSelectBox = styled.div`
  margin: 0 auto;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  > * {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }
  > :nth-child(1) {
    margin-bottom: 5px;
  }
  > :nth-child(2) {
    > :nth-child(1) {
      display: none;
    }
  }
`;

const PeriodBox = styled.div`
  margin-bottom: 10px;
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  color: ${(props) => props.theme.mainText};
  border-top: 1px solid ${(props) => props.theme.mainGray};
  border-bottom: 1px solid ${(props) => props.theme.mainGray};
  font-weight: 500;
`;

const CardContentBox = styled.div`
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  text-align: start;
  color: ${(props) => props.theme.mainText};
  > :first-child {
    > :nth-child(2) {
      display: none;
    }
  }
`;

const ResponsiveHeadBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px;
  > * {
    flex: 1;
  }
  > :nth-child(2) {
    display: flex;
    flex-direction: column;
    margin-left: auto;
    > :nth-child(1) {
      margin-right: 7px;
    }
    > * {
      margin-left: auto;
      > * {
        margin-left: auto;
      }
    }
  }
`;
const ResponsivePeriodBox = styled.div`
  margin-bottom: 5px;
`;

const ResponsiveContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  height: 100%;

  > :nth-child(1) {
    flex: 1;
  }
  > :nth-child(2) {
    flex: 5;
  }
  > :nth-child(3) {
    flex: 1;
  }
`;

const ResponsiveSubjectBox = styled.div``;
const ResponsiveParagraphBox = styled.div`
  padding: 0 12px;
`;
const ResponsiveGraphContentBox = styled.div`
  height: 100%;
  width: 100%;
`;

interface ModalGraphProps {
  currentModalData: {
    subject?: string;
    graph: any;
    h2: string;
    h3: string;
    p: string;
    fontSize?: any;
  };
}

const ModalGraph = ({ currentModalData }: ModalGraphProps) => {
  const isDetailPage = useLocation().pathname.includes("detail");

  const dispatch = useDispatch();

  const { subject, graph, h2, h3, p } = currentModalData;

  const results = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );
  const chatDates = getDates(results)[selectedChatRoomIndex];
  const datePickerPeriodData = [chatDates.flat()[0], chatDates.flat().slice(-1)[0]];

  const handleClickCloseModalButton = () => {
    setIsModalVisible && dispatch(setIsModalVisible(false));
  };

  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ModalGraphBox>
      {isDetailPage ? null : (
        <CloseModalBox onClick={() => handleClickCloseModalButton()}>
          <Icon fontSize="24px">
            <MdClose />
          </Icon>
        </CloseModalBox>
      )}
      {isDetailPage && screenWidth > 1024 ? (
        <ContentBox>
          <GraphContentBox className="GraphContentBox">{graph}</GraphContentBox>
          <DescriptionBox>
            <InfoContentBox>
              <Span fontWeight="700" textAlign="center">
                그래프 상세 정보
              </Span>
              {subject === "종합 비교" ? (
                <SpeakerSelectBox></SpeakerSelectBox>
              ) : (
                <SpeakerSelectBox>
                  <ChatRatioWithArrowGraph />
                  <SpeakerSelect />
                </SpeakerSelectBox>
              )}

              <PeriodBox>
                {datePickerPeriodData[0]} ~ {datePickerPeriodData[1]}
              </PeriodBox>
            </InfoContentBox>
            <CardContentBox>
              <CardContent h2={h2} h3={h3} p={p} />
            </CardContentBox>
          </DescriptionBox>
        </ContentBox>
      ) : (
        <ResponsiveContentBox>
          <ResponsiveHeadBox>
            <ResponsiveSubjectBox>
              <ResponsivePeriodBox>
                {datePickerPeriodData[0]} ~ {datePickerPeriodData[1]}
              </ResponsivePeriodBox>
              <Span fontSize="28px" fontWeight="700" textAlign="center">
                {h2}
              </Span>
            </ResponsiveSubjectBox>

            {subject === "종합 비교" ? (
              <SpeakerSelectBox></SpeakerSelectBox>
            ) : (
              <SpeakerSelectBox>
                <ChatRatioWithArrowGraph />
                <SpeakerSelect />
              </SpeakerSelectBox>
            )}
          </ResponsiveHeadBox>
          <ResponsiveGraphContentBox className="GraphContentBox">{graph}</ResponsiveGraphContentBox>
          <ResponsiveParagraphBox>
            <Span fontSize="18px">{p}</Span>
          </ResponsiveParagraphBox>
        </ResponsiveContentBox>
      )}
    </ModalGraphBox>
  );
};

export default ModalGraph;
