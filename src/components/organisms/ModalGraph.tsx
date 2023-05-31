import React from "react";
import styled from "styled-components";
import Span from "../atoms/Span";
import Icon from "../atoms/Icon";
import ChatRatioWithArrowGraph from "../molecules/graphs/ChatRatioWithArrowGraph";
import SpeakerSelect from "../atoms/SpeakerSelect";
import CardContent from "../molecules/CardContent";

const ModalGraphBox = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
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
  flex: 3;
  /* background: #ff00ff15; */
`;

const GraphDescriptionBox = styled.div`
  flex: 1;
  /* background: #0000ff13; */
`;

const SpeakerSelectBox = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
`;
const DescriptionBox = styled.div`
  height: 37%;
`;

const CardContentBox = styled.div`
  padding: 15px;
  > * {
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;
    text-align: start;
    border: 1px solid ${(props) => props.theme.mainGray};
    border-radius: 15px;
  }
`;

interface ModalGraphProps {
  currentModalData: any;
  setIsModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalGraph = ({ setIsModalVisible, currentModalData }: ModalGraphProps) => {
  const { subject, graph, h2, h3, p } = currentModalData;

  const handleClickCloseModalButton = () => {
    setIsModalVisible && setIsModalVisible(false);
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
          <DescriptionBox>2023.01~2023.03</DescriptionBox>
          <CardContentBox>
            <CardContent h2={h2} h3={h3} p={p} />
          </CardContentBox>
        </GraphDescriptionBox>
      </ContentBox>
    </ModalGraphBox>
  );
};

export default ModalGraph;
