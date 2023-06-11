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
    font-weight: 300;
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

const mobileCardData = [
  {
    src: process.env.PUBLIC_URL + "/assets/mobileHowToExport/android_method01.png",
    text: "메뉴의 톱니바퀴를 클릭합니다.",
  },
  {
    src: process.env.PUBLIC_URL + "/assets/mobileHowToExport/android_method02.png",
    text: "대화내용 내보내기를 눌러 저장을 합니다.",
  },
  {
    src: process.env.PUBLIC_URL + "/assets/mobileHowToExport/android_method03.png",
    text: "파일에서 kakao를 검색하여 찾을 수 있습니다.",
  },
];

const pcCardData = [
  {
    src: process.env.PUBLIC_URL + "/assets/mobileHowToExport/pc_method01.png",
    text: "Mac OS: 메뉴 - 채팅방 설정 - 대화 내용 저장",
  },
  {
    src: process.env.PUBLIC_URL + "/assets/mobileHowToExport/pc_method02.png",
    text: "Window : 메뉴 - 대화내용 - 내보내기",
  },
  {
    src: process.env.PUBLIC_URL + "/assets/mobileHowToExport/pc_method03.png",
    text: "대화 내보내기 완료를 확인합니다.",
  },
];

const AttachmentDescriptionSection = () => {
  const [cardData, setCardData] = useState<CardData[]>(pcCardData);
  return (
    <AttachDescriptionBox>
      <Paragraph fontSize="24px">
        현재 실행하고 있는 기기에서 카카오톡 메시지 내보내기 방법 알아보기
      </Paragraph>
      <ButtonBox>
        <RadiusButton onClick={() => setCardData(pcCardData)}>PC</RadiusButton>
        <RadiusButton onClick={() => setCardData(mobileCardData)}>모바일</RadiusButton>
      </ButtonBox>
      <ThreeImages srcAndText={cardData} />
      <RadiusButton onClick={() => scrollToEvent(0, "smooth")}>분석하러 가기</RadiusButton>
    </AttachDescriptionBox>
  );
};

export default AttachmentDescriptionSection;
