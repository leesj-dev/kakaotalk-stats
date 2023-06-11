import React from "react";
import styled from "styled-components";
import Paragraph from "../atoms/Paragraph";
import Span from "../atoms/Span";
import Img from "../atoms/Img";
import { useNavigate } from "react-router-dom";
import ScrollIndicator from "../molecules/ScrollIndicator";
import RadiusButton from "../atoms/Button";
import { useSelector } from "react-redux";

const MainVisualContainer = styled.div`
  width: 100%;
  max-width: 1240px;
  position: relative;
  padding: 100px 20px 80px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    min-width: 1240px;
    padding: 50px 20px 0 20px;
    flex-direction: column;
  }
  @media (max-width: 600px) {
    width: 100%;
    min-width: 700px;
    padding: 50px 20px 0 20px;
    flex-direction: column;
  }
  @media (max-width: 320px) {
    width: 100%;
    min-width: 450px;
    padding: 30px 10px 0 10px;
    flex-direction: column;
  }
`;

const AsideBox = styled.div`
  width: 70%;
  max-width: 610px;
  margin-right: 30px;
  @media (max-width: 768px) {
    padding: 0 20px;
    margin-right: 0;
    text-align: center;
  }

  > :nth-child(2) {
    margin-bottom: 50px;
    width: 100%;
    height: 100%;
    white-space: wrap;
    font-size: 22px;

    @media (max-width: 1220px) {
      font-size: 20px;
    }
    @media (max-width: 768px) {
      text-align: center;
    }
    @media (max-width: 320px) {
      font-size: 15px;
    }
  }
  > :nth-child(3) {
    display: inline-block;
    text-decoration: underline;
    text-underline-position: under;
    margin-bottom: 30px;
  }
  > :last-child {
    text-align: center;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: -50px;
  }
`;

const ArticleBox = styled.div`
  width: 50%;
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const LogoBox = styled.div`
  width: 300px;
  height: 100px;
  margin-bottom: 30px;
  transform: translateX(-3px);
  @media (max-width: 768px) {
    margin: 0 auto 30px;
  }
  @media (max-width: 480px) {
    width: 210px;
    height: 70px;
  }
  @media (max-width: 320px) {
    width: 150px;
    height: 50px;
  }
`;

const MainVisualImgBox = styled.div`
  transform: translateY(10%);
  box-shadow: 2px 2px 7px -2px ${(props) => props.theme.mainBlack};
`;

interface MainVisualProps {
  onMoveToFunctionCard: () => void;
}

const MainVisual = ({ onMoveToFunctionCard }: MainVisualProps) => {
  const navigate = useNavigate();

  const isDarkMode = useSelector((state: { isDarkModeSlice: boolean }) => state.isDarkModeSlice);

  return (
    <MainVisualContainer>
      <AsideBox>
        <LogoBox>
          <Img src={`${process.env.PUBLIC_URL}/images/${isDarkMode ? "logoGray" : "logoBlack"}.png`} />
        </LogoBox>
        <Paragraph fontSize="22px" lineHeight="1.5">
          사용자가 선택한 기간 동안의 카카오톡 채팅방 대화 내용을 분석하여,주요단어 및 키워드를 추출해
          보여주는 웹 어플리케이션입니다. 이를 통해 사용자는 대화 내용을 한 눈에 파악하고, 효과적인
          의사소통에 도움을 받을 수 있습니다.
        </Paragraph>
        <RadiusButton onClick={() => navigate("/2")}>GET STARTED</RadiusButton>
        <ScrollIndicator onClick={() => onMoveToFunctionCard()}>
          카카오 돋보기의 분석 기능
        </ScrollIndicator>
      </AsideBox>
      <ArticleBox>
        <MainVisualImgBox>
          <Img src={`${process.env.PUBLIC_URL}/images/mainVisual.png`} />
        </MainVisualImgBox>
      </ArticleBox>
    </MainVisualContainer>
  );
};

export default MainVisual;
