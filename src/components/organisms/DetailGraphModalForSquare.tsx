import React from "react";
import styled from "styled-components";
import Span from "../atoms/Span";
import Icon from "../atoms/Icon";

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
  box-shadow: 0px 0px 9px 3px ${(props) => props.theme.mainBlack};
  z-index: 999;
`;

const CloseModalBox = styled.div`
  background: #f00;
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
const DescriptionBox = styled.div``;

interface DetailGraphModalForSquareProps {
  setIsModalVisible: (visible: boolean) => void;
}

const DetailGraphModalForSquare = ({ setIsModalVisible }: DetailGraphModalForSquareProps) => {
  return (
    <DetailGraphModalForSquareBox>
      <Span>그래프 이름</Span>
      <CloseModalBox onClick={() => setIsModalVisible(false)}>
        <Icon>X</Icon>
      </CloseModalBox>
      <ContentBox>
        <SquareGraphBox>그래프</SquareGraphBox>
        <GraphDescriptionBox>
          <DescriptionBox>설명</DescriptionBox>
        </GraphDescriptionBox>
      </ContentBox>
    </DetailGraphModalForSquareBox>
  );
};

export default DetailGraphModalForSquare;
