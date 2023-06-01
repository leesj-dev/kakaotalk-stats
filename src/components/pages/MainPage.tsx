import React, { useEffect, useRef } from "react";
import FunctionCard from "../organisms/FunctionCard";
import MainVisual from "../organisms/MainVisual";
import styled from "styled-components";
import scrollToEvent from "../../module/common/scrollEvent";
import Img from "../atoms/Img";

const Main2Container = styled.div`
  width: 100%;
`;

const Main2Wrapper = styled.div`
  padding: 100px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const MainVisualImg = styled.div`
  width: 40%;
  position: absolute;
  top: 60%;
  right: 120px;
  transform: translateY(-50%);
  rotate: 15deg;
  box-shadow: 2px 2px 7px -2px ${(props) => props.theme.mainBlack};
`;

const MainPage = () => {
  const moveScrollPosition = useRef<HTMLDivElement | null>(null);

  const onMoveToFunctionCard = () => {
    if (moveScrollPosition.current) {
      scrollToEvent(moveScrollPosition.current.offsetTop, "smooth");
    }
  };

  useEffect(() => {
    scrollToEvent(0, "auto");
  }, []);

  return (
    <Main2Container>
      <Main2Wrapper>
        <MainVisualImg>
          <Img src={`${process.env.PUBLIC_URL}/images/mainVisual.png`} />
        </MainVisualImg>
        <MainVisual onMoveToFunctionCard={onMoveToFunctionCard} />
        <FunctionCard moveScrollPosition={moveScrollPosition} />
      </Main2Wrapper>
    </Main2Container>
  );
};

export default MainPage;
