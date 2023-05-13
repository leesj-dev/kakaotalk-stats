import React, { useRef } from "react";
import FunctionCard from "../organisms/FunctionCard";
import MainVisual from "../organisms/MainVisual";
import styled from "styled-components";
import FloatingBtn from "../molecules/FloatingBtn";
import scrollToEvent from "../../module/common/scrollEvent";

const Main2Container = styled.div`
  width: 100%;
`;

const Main2Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const MainPage = () => {
  const moveScrollPosition = useRef<HTMLDivElement | null>(null);

  const onMoveToFunctionCard = () => {
    if (moveScrollPosition.current) {
      scrollToEvent(moveScrollPosition.current.offsetTop);
    }
  };

  return (
    <Main2Container>
      <Main2Wrapper>
        <FloatingBtn />
        <MainVisual onMoveToFunctionCard={onMoveToFunctionCard} />
        <FunctionCard moveScrollPosition={moveScrollPosition} />
      </Main2Wrapper>
    </Main2Container>
  );
};

export default MainPage;
