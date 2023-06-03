import React, { useEffect } from "react";
import styled from "styled-components";
import Span from "../atoms/Span";
import Icon from "../atoms/Icon";
import ChatRatioWithArrowGraph from "../molecules/graphs/ChatRatioWithArrowGraph";
import SpeakerSelect from "../molecules/SpeakerSelect";
import CardContent from "../molecules/CardContent";
import { useLocation } from "react-router";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { AnalyzedMessage } from "../../@types/index.d";
import { getChatTimes, getDates } from "../../module/common/getProperties";
import { setSelectedChatRoomIndex } from "../../store/reducer/selectedRoomIndexSlice";

const ModalGraphBox = styled.div`
  padding: 30px;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.modalBackground};
  backdrop-filter: blur(80px);
  box-shadow: 2px 2px 7px -2px ${(props) => props.theme.mainBlack};
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

const SquareGraphBox = styled.div`
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

interface ModalGraphProps {
  currentModalData: any;
  setIsModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalGraph = ({ setIsModalVisible, currentModalData }: ModalGraphProps) => {
  const isDetailPage = useLocation().pathname.includes("detail");

  const { subject, graph, h2, h3, p, fontSize } = currentModalData;

  const handleClickCloseModalButton = () => {
    setIsModalVisible && setIsModalVisible(false);
  };

  const results = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );
  const chatDates = getDates(results)[selectedChatRoomIndex];
  const datePickerPeriodData = [chatDates.flat()[0], chatDates.flat().slice(-1)[0]];

  return (
    <ModalGraphBox>
      <CloseModalBox onClick={() => handleClickCloseModalButton()}>
        {isDetailPage ? null : (
          <Icon fontSize="24px">
            <MdClose />
          </Icon>
        )}
      </CloseModalBox>
      <ContentBox>
        <SquareGraphBox>{graph}</SquareGraphBox>
        <DescriptionBox>
          <InfoContentBox>
            <Span fontWeight="700" textAlign="center">
              그래프 상세 정보
            </Span>
            <SpeakerSelectBox>
              <ChatRatioWithArrowGraph />
              <SpeakerSelect />
            </SpeakerSelectBox>
            <PeriodBox>
              {datePickerPeriodData[0]} ~ {datePickerPeriodData[1]}
            </PeriodBox>
          </InfoContentBox>

          <CardContentBox>
            <CardContent h2={h2} h3={h3} p={p} />
          </CardContentBox>
        </DescriptionBox>
      </ContentBox>
    </ModalGraphBox>
  );
};

export default ModalGraph;
