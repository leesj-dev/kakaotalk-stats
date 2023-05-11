import React from "react";
import styled from "styled-components";
import Paragraph from "../atoms/Paragraph";
import RadiusButton from "../atoms/Button";
import ImageCard from "../molecules/ImgaeCard";
import Icon from "../atoms/Icon";

const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  > * {
    margin-bottom: 30px;
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

const Description = () => {
  return (
    <DescriptionBox>
      <Paragraph fontSize="24px">현재 실행하고 있는 기기에서 카카오톡 메시지 내보내기 방법</Paragraph>
      <ButtonBox>
        <RadiusButton>모바일</RadiusButton>
        <RadiusButton>PC</RadiusButton>
      </ButtonBox>

      <ThreeImagesBox>
        <ImageCard></ImageCard>
        <Icon>{">"}</Icon>
        <ImageCard></ImageCard>
        <Icon>{">"}</Icon>
        <ImageCard></ImageCard>
      </ThreeImagesBox>
      <RadiusButton>분석하러 가기</RadiusButton>
    </DescriptionBox>
  );
};

export default Description;
