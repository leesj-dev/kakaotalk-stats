import React, { useState } from "react";
import styled from "styled-components";
import RadiusButton from "../atoms/Button";
import Paragraph from "../atoms/Paragraph";
import ThreeImages, { CardData } from "../organisms/ThreeImages";
import scrollToEvent from "../../module/common/scrollEvent";

const AttachDescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  > * {
    margin-bottom: 30px;
  }

  > :nth-child(2) {
    margin-bottom: 60px;
  }

  > :last-child {
    margin-bottom: 0;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 10px;
`;

const pcCardData = [
  { src: "", text: "PC설명1" },
  { src: "", text: "PC설명2" },
  { src: "", text: "PC설명3" },
];

const mobileCardData = [
  { src: "", text: "모바일설명1" },
  { src: "", text: "모바일설명2" },
  { src: "", text: "모바일설명3" },
];

const AttachmentDescriptionSection = () => {
  const [cardData, setCardData] = useState<CardData[]>(pcCardData);
  return (
    <AttachDescriptionBox>
      <Paragraph fontSize="24px">
        현재 실행하고 있는 기기에서 카카오톡 메시지를 내보내는 방법 알아보기
      </Paragraph>
      <ButtonBox>
        <RadiusButton onClick={() => setCardData(pcCardData)}>PC</RadiusButton>
        <RadiusButton onClick={() => setCardData(mobileCardData)}>모바일</RadiusButton>
      </ButtonBox>
      <ThreeImages srcAndText={cardData} />
      <RadiusButton onClick={() => scrollToEvent(0)}>분석하러 가기</RadiusButton>
    </AttachDescriptionBox>
  );
};

export default AttachmentDescriptionSection;
