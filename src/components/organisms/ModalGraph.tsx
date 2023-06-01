import React, { useEffect } from "react";
import styled from "styled-components";
import Span from "../atoms/Span";
import Icon from "../atoms/Icon";
import ChatRatioWithArrowGraph from "../molecules/graphs/ChatRatioWithArrowGraph";
import SpeakerSelect from "../atoms/SpeakerSelect";
import CardContent from "../molecules/CardContent";
import { useLocation } from "react-router";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { AnalyzedMessage } from "../../@types/index.d";
import { getChatTimes, getDates } from "../../module/common/getProperties";
import { setSelectedChatRoomIndex } from "../../store/reducer/selectedRoomIndexSlice";

const ModalGraphBox = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* background: #5badff3a; */
  background: #ffffff39;
  backdrop-filter: blur(70px);
  box-shadow: 2px 2px 7px -2px ${(props) => props.theme.mainBlack};
  border-radius: 15px;
`;

const CloseModalBox = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;

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
  flex: 4;
  /* background: #ff00ff15; */
`;

const GraphDescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 10px;
  background-color: ${(props) => props.theme.mainWhite};
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  /* background: #0000ff13; */
`;

const SpeakerSelectBox = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;
const DescriptionBox = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.mainGray};
  border-radius: 15px;
  font-weight: 500;
`;

const CardContentBox = styled.div`
  > * {
    padding: 20px;
    display: flex;
    flex-direction: column;
    border: 1px solid ${(props) => props.theme.mainGray};
    border-radius: 15px;
  }
`;
const InfoContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

interface ModalGraphProps {
  currentModalData: any;
  setIsModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalGraph = ({ setIsModalVisible, currentModalData }: ModalGraphProps) => {
  const isDetailPage = useLocation().pathname.includes("detail");

  const { subject, graph, h2, h3, p } = currentModalData;

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
        <GraphDescriptionBox>
          <InfoContentBox>
            <Span fontWeight="700" textAlign="center">
              INFORMATION
            </Span>
            <SpeakerSelectBox>
              <ChatRatioWithArrowGraph />
              <SpeakerSelect />
            </SpeakerSelectBox>
            <DescriptionBox>
              {datePickerPeriodData[0]} ~ {datePickerPeriodData[1]}
            </DescriptionBox>
          </InfoContentBox>

          <CardContentBox>
            <CardContent h2={h2} h3={h3} p={p} />
          </CardContentBox>
        </GraphDescriptionBox>
      </ContentBox>
    </ModalGraphBox>
  );
};

export default ModalGraph;
