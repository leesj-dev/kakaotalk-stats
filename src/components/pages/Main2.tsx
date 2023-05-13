import React, { useRef } from "react";
import FunctionCard from "../organisms/FunctionCard";
import MainVisual from "../organisms/MainVisual";
import styled from "styled-components";
import Ftn from "../atoms/Ftn";

const Main2Container = styled.div`
  width: 100%;
`;

const Main2Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Main2 = () => {
  const moveScrollPosition = useRef<HTMLDivElement | null>(null);
  const onMoveToFunctionCard = () => {
    if (moveScrollPosition.current) {
      moveScrollPosition.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <Main2Container>
      <Main2Wrapper>
        <Ftn />
        <MainVisual onMoveToFunctionCard={onMoveToFunctionCard} />
        <FunctionCard moveScrollPosition={moveScrollPosition} />
      </Main2Wrapper>
    </Main2Container>
  );
};

export default Main2;
