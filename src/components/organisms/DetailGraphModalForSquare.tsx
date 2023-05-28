import React from "react";
import styled from "styled-components";
import Span from "../atoms/Span";
import Icon from "../atoms/Icon";
import ChatRatioWithArrowGraph from "./graphs/ChatRatioWithArrowGraph";
import SpeakerSelect from "../atoms/SpeakerSelect";
import CardContent from "../molecules/CardContent";

const DetailGraphModalForSquareBox = styled.div`
  position: fixed;
  top: 100px;
  bottom: 100px;
  left: 200px;
  right: 200px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  background: #5badff3a;
  backdrop-filter: blur(10px);
  box-shadow: 3px 3px 10px 3px ${(props) => props.theme.mainBlue};
  border-radius: 15px;
  z-index: 999;
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
  flex: 3;
  background: #ff00ff70;
`;

const GraphDescriptionBox = styled.div`
  flex: 1;
  background: #0000ff81;
`;

const SpeakerSelectBox = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  background-color: #ff0;
`;
const DescriptionBox = styled.div``;

interface DetailGraphModalForSquareProps {
  setIsModalVisible: (visible: boolean) => void;
  currentModalData?: any;
  setCurrentModalData: any;
}

const DetailGraphModalForSquare = ({
  setIsModalVisible,
  currentModalData,
  setCurrentModalData,
}: DetailGraphModalForSquareProps) => {
  const handleClickCloseModalButton = () => {
    setIsModalVisible(false);
    setCurrentModalData(-1);
  };
  console.log(currentModalData);

  return (
    <DetailGraphModalForSquareBox>
      <Span>{currentModalData?.subject}</Span>
      <CloseModalBox onClick={() => handleClickCloseModalButton()}>
        <Icon fontSize="24px">❌</Icon>
      </CloseModalBox>
      <ContentBox>
        <SquareGraphBox>{currentModalData?.graph}</SquareGraphBox>
        <GraphDescriptionBox>
          <SpeakerSelectBox>
            <ChatRatioWithArrowGraph />
            <SpeakerSelect />
          </SpeakerSelectBox>
          {/* <CardContent h2={currentModalData?.h2} h3={currentModalData?.h3} p={currentModalData?.p} /> */}
          <DescriptionBox>설명</DescriptionBox>
        </GraphDescriptionBox>
      </ContentBox>
    </DetailGraphModalForSquareBox>
  );
};

export default DetailGraphModalForSquare;
