import React from "react";
import styled from "styled-components";
import Span from "../atoms/Span";
import Icon from "../atoms/Icon";
import ChatRatioWithArrowGraph from "./graphs/ChatRatioWithArrowGraph";
import SpeakerSelect from "../atoms/SpeakerSelect";
import CardContent from "../molecules/CardContent";
import { GraphBoxProps } from "./GraphDisplay";

const ModalGraphBox = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  background: #5badff3a;
  backdrop-filter: blur(10px);
  box-shadow: 3px 3px 10px 3px ${(props) => props.theme.mainBlue};
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
  flex: 3;
  background: #ff00ff15;
`;

const GraphDescriptionBox = styled.div`
  flex: 1;
  background: #0000ff13;
`;

const SpeakerSelectBox = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
`;
const DescriptionBox = styled.div``;

const CardContentBox = styled.div`
  padding: 15px;
  > * {
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;
    text-align: start;
    border: 1px solid #ddd;
    border-radius: 15px;
  }
`;

interface ModalGraphProps {
  currentModalData: any;
  modalSetProps?: GraphBoxProps;
}

const ModalGraph = ({ modalSetProps, currentModalData }: ModalGraphProps) => {
  const { subject, graph, h2, h3, p } = currentModalData;

  const handleClickCloseModalButton = () => {
    modalSetProps?.setIsModalVisible(false);
    modalSetProps?.setCurrentModalData(-1);
  };

  return (
    <ModalGraphBox>
      <Span>{subject}</Span>
      <CloseModalBox onClick={() => handleClickCloseModalButton()}>
        <Icon fontSize="24px">❌</Icon>
      </CloseModalBox>
      <ContentBox>
        <SquareGraphBox>{graph}</SquareGraphBox>
        <GraphDescriptionBox>
          <SpeakerSelectBox>
            <ChatRatioWithArrowGraph />
            <SpeakerSelect />
          </SpeakerSelectBox>
          <CardContentBox>
            <CardContent h2={h2} h3={h3} p={p} />
          </CardContentBox>
          <DescriptionBox>설명</DescriptionBox>
        </GraphDescriptionBox>
      </ContentBox>
    </ModalGraphBox>
  );
};

export default ModalGraph;
