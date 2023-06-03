import React from "react";
import styled from "styled-components";
import Paragraph from "../atoms/Paragraph";
import Span from "../atoms/Span";
import Img from "../atoms/Img";
import { useNavigate } from "react-router-dom";
import ScrollIndicator from "../molecules/ScrollIndicator";
import RadiusButton from "../atoms/Button";
import { useSelector } from "react-redux";

const Container = styled.div`
  position: relative;
  width: 1200px;
  padding: 100px 0 80px 0;
`;

const LogoBox = styled.div`
  width: 300px;
  height: 100px;
  margin-bottom: 30px;
  transform: translateX(-3px);
`;

const AsideBox = styled.div`
  width: 50%;
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
    margin-bottom: 100px;
  }
  > :last-child {
    text-align: center;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: 0;
  }
`;
const ArticleBox = styled.div``;
const MainVisualImgBox = styled.div`
  position: absolute;
  top: 50%;
  right: 7%;
  transform: translateY(-50%);
  width: 45%;
  rotate: 15deg;
  box-shadow: 2px 2px 7px -2px ${(props) => props.theme.mainBlack};
`;
interface MainVisualProps {
  onMoveToFunctionCard: () => void;
}
const MainBox = styled.div``;
const MainVisual = ({ onMoveToFunctionCard }: MainVisualProps) => {
  const navigate = useNavigate();

  const isDarkMode = useSelector((state: { isDarkModeSlice: boolean }) => state.isDarkModeSlice);

  return (
    <MainBox>
      <Container>
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
      </Container>
    </MainBox>
  );
};

export default MainVisual;
