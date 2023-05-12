import React, { useRef } from "react";
import FunctionCard from "../components/organisms/FunctionCard";
import MainVisual from "../components/organisms/MainVisual";
import styled from "styled-components";

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
  // const moveTarget = useRef();
  // const onMoveToFunctionCard = () => {
  //   moveTarget.current.scrollIntoView({ behavior: "smooth", block: "start" });
  // };
  return (
    <Main2Container>
      <Main2Wrapper>
        <MainVisual
        //onMoveToFunctionCard={onMoveToFunctionCard}
        />
        <FunctionCard
        // ref={moveTarget}
        />
      </Main2Wrapper>
    </Main2Container>
  );
};

export default Main2;
