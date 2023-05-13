import React from "react";
import styled from "styled-components";
import RadiusButton from "../atoms/Button";
import Paragraph from "../atoms/Paragraph";
import ImageCard from "../molecules/ImgaeCard";
import Icon from "../atoms/Icon";

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

const ThreeImagesBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 1200px;
  gap: 30px;
`;

const AttachDescriptionSection = () => {
  return (
    <AttachDescriptionBox>
      <Paragraph fontSize="24px">
        현재 실행하고 있는 기기에서 카카오톡 메시지를 내보내는 방법 알아보기
      </Paragraph>
      <ButtonBox>
        <RadiusButton>PC</RadiusButton>
        <RadiusButton>모바일</RadiusButton>
      </ButtonBox>
      <ThreeImagesBox>
        <ImageCard></ImageCard>
        <Icon>{">"}</Icon>
        <ImageCard></ImageCard>
        <Icon>{">"}</Icon>
        <ImageCard></ImageCard>
      </ThreeImagesBox>
      <RadiusButton>분석하러 가기</RadiusButton>
    </AttachDescriptionBox>
  );
};

export default AttachDescriptionSection;
