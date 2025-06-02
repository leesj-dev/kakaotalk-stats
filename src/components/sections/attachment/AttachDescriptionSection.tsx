import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import BlueButton from "../../atoms/BlueButton";
import Paragraph from "../../atoms/Paragraph";
import ThreeImages, { CardData } from "../../organisms/attachment/ThreeImages";
import scrollToEvent from "../../../module/common/scrollToEvent";
import { useLocation } from "react-router";
import { FlexCenterDiv, FlexColumnCenterDiv } from "../../atoms/FlexDiv";

const AttachDescriptionBox = styled(FlexColumnCenterDiv)`
  padding: 80px 0;
`;

const OsButtonBox = styled(FlexCenterDiv)`
  gap: 30px;
  margin-bottom: 30px;
  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const TitleParagraph = styled(Paragraph)`
  margin-bottom: 30px;
  padding: 0 10px;
`;

const ThreeImagesBox = styled.div`
  margin-bottom: 15px;
`;

const mobileCardData = [
  {
    id: 1,
    src: process.env.PUBLIC_URL + "/images/attachmentMethod/android_method01.png",
    text: "메뉴의 톱니바퀴를 클릭합니다.",
  },
  {
    id: 2,
    src: process.env.PUBLIC_URL + "/images/attachmentMethod/android_method02.png",
    text: "대화내용 내보내기를 눌러 저장합니다.",
  },
  {
    id: 3,
    src: process.env.PUBLIC_URL + "/images/attachmentMethod/android_method03.png",
    text: "파일에서 Kakao를 검색하여 찾을 수 있습니다.",
  },
];

const pcCardData = [
  {
    id: 4,
    src: process.env.PUBLIC_URL + "/images/attachmentMethod/pc_method01.png",
    text: "macOS: 메뉴 - 채팅방 설정 - 대화 내용 저장",
  },
  {
    id: 5,
    src: process.env.PUBLIC_URL + "/images/attachmentMethod/pc_method02.png",
    text: "Windows: 메뉴 - 대화내용 - 내보내기",
  },
  {
    id: 6,
    src: process.env.PUBLIC_URL + "/images/attachmentMethod/pc_method03.png",
    text: "대화 내보내기 완료를 확인합니다.",
  },
];

const AttachmentDescriptionSection = () => {
  const location = useLocation();
  const isDescriptionIndex = location.hash.includes("description");
  const isAnalysisIndex = location.hash.includes("analysis");
  const AttachDescriptionBoxRef = useRef<HTMLDivElement>(null);

  const [cardData, setCardData] = useState<CardData[]>(pcCardData);

  const osData = [
    { label: "PC", data: pcCardData },
    { label: "모바일", data: mobileCardData },
  ];

  useEffect(() => {
    if (isDescriptionIndex && AttachDescriptionBoxRef.current) {
      setTimeout(() => {
        scrollToEvent(AttachDescriptionBoxRef.current!.offsetTop - 50, "smooth");
      }, 10);
    }
    if (isAnalysisIndex) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 10);
    }
  }, [location, isDescriptionIndex, isAnalysisIndex]);

  return (
    <AttachDescriptionBox id="attachMethod" ref={AttachDescriptionBoxRef}>
      <TitleParagraph fontSize="24px">
        현재 실행하고 있는 기기에서 카카오톡 메시지 내보내기 방법 알아보기
      </TitleParagraph>
      <OsButtonBox>
        {osData.map((item) => (
          <BlueButton
            key={item.label}
            inactive={cardData !== item.data}
            onClick={() => setCardData(item.data)}
          >
            {item.label}
          </BlueButton>
        ))}
      </OsButtonBox>
      <ThreeImagesBox>
        <ThreeImages srcAndText={cardData} />
      </ThreeImagesBox>
      <BlueButton onClick={() => scrollToEvent(0, "smooth")}>분석하러 가기</BlueButton>
    </AttachDescriptionBox>
  );
};

export default AttachmentDescriptionSection;
