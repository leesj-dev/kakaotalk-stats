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
    width: 1200px;
    padding-top: 50px;
    flex-direction: column;
  }
`;

const AsideBox = styled.div`
  width: 50%;
  margin-right: 30px;
  > :nth-child(2) {
    margin-bottom: 50px;
    > * {
      margin-bottom: 10px;
    }
  }
  > :nth-child(3) {
    display: inline-block;
    text-decoration: underline;
    text-underline-position: under;
    margin-bottom: 10px;
  }
  > :last-child {
    text-align: center;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: 0;
  }
`;

const ArticleBox = styled.div`
  width: 50%;
`;

const LogoBox = styled.div`
  width: 300px;
  height: 100px;
  margin-bottom: 30px;
  transform: translateX(-3px);
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
        <Paragraph>
          <Span fontSize="22px" fontWeight="300">
            사용자가 선택한 기간 동안의 카카오톡 채팅방 대화 내용을 분석하여,
          </Span>
          <Span fontSize="22px" fontWeight="300">
            주요단어 및 키워드를 추출해 보여주는 웹 어플리케이션입니다.
          </Span>
          <Span fontSize="22px" fontWeight="300">
            이를 통해 사용자는 대화 내용을 한 눈에 파악하고,
          </Span>
          <Span fontSize="22px" fontWeight="300">
            효과적인 의사소통에 도움을 받을 수 있습니다.
          </Span>
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
