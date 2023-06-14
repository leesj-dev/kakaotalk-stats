import React from "react";
import styled from "styled-components";
import Paragraph from "../atoms/Paragraph";
import Img from "../atoms/Img";
import { useNavigate } from "react-router-dom";
import ScrollIndicator from "../molecules/ScrollIndicator";
import RadiusButton from "../atoms/BlueButton";
import { FlexCenterDiv } from "../styleComponents/FlexDiv";

const MainVisualContainer = styled(FlexCenterDiv)`
  width: 100%;
  max-width: 1200px;
  position: relative;
  padding: 100px 0px;
  text-align: start;

  @media (max-width: 768px) {
    max-width: 808px;
    padding: 50px 0px 0;
    flex-direction: column;
  }
  @media (max-width: 480px) {
    max-width: 520px;
  }
  @media (max-width: 320px) {
    max-width: 360px;
    padding: 30px 0 0;
  }
`;

const AsideBox = styled.div`
  width: 50%;
  margin-right: 30px;

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    text-align: center;
  }
  > :nth-child(2) {
    margin-bottom: 30px;
  }
  > :nth-child(3) {
    display: inline-block;
    text-decoration: underline;
    text-underline-position: under;
    margin-bottom: 30px;
  }
  > :last-child {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -50px;
  }
`;

const ArticleBox = styled.div`
  width: 50%;
  @media (max-width: 768px) {
    margin-bottom: 40px;
    width: 100%;
  }
`;

const LogoBox = styled.div`
  margin-bottom: 30px;
  font-size: 3.6rem;
  font-weight: 700;
`;

const MainVisualImgBox = styled.div`
  box-shadow: 2px 2px 7px -2px ${(props) => props.theme.mainBlack};
`;

interface MainVisualProps {
  onMoveToFunctionCard: () => void;
}

const MainVisual = ({ onMoveToFunctionCard }: MainVisualProps) => {
  const navigate = useNavigate();

  return (
    <MainVisualContainer>
      <AsideBox>
        <LogoBox>
          <Paragraph fontSize="3.6rem" fontWeight="700" lineHeight="1.5">
            카카오돋보기 2023
          </Paragraph>
          <Paragraph fontSize="2.8rem" lineHeight="1.5" fontWeight="900" color="#a6a6a6">
            내가 좋아하는 사람을 내것으로 만들기 위한 필수
            사이트⭐100%성공보장없음⭐즐겁다❗❗❗구독좋아요알림설정👍확률2배UP EVENT✅이 사이트는 무료로
            해줍니다🥰원하다 당신의 관심이🙇‍♂️메시지 분석하러가기💯안전사이트비밀보장💯
          </Paragraph>
        </LogoBox>
        <Paragraph fontSize="2.2rem" lineHeight="1.5">
          카카오돋보기는 대화를 분석하여 인사이트를 제공하는 도구입니다. 대화의 양이나 시간대와 같은
          정보를 통하여 재미보셈
        </Paragraph>
        <RadiusButton onClick={() => navigate("/attachment")}>GET STARTED</RadiusButton>
        <ScrollIndicator onClick={() => onMoveToFunctionCard()}>
          카카오 돋보기의 분석 기능
        </ScrollIndicator>
      </AsideBox>
      <ArticleBox>
        <MainVisualImgBox>
          <Img src={`${process.env.PUBLIC_URL}/images/main/mainVisual.png`} />
        </MainVisualImgBox>
      </ArticleBox>
    </MainVisualContainer>
  );
};

export default MainVisual;
