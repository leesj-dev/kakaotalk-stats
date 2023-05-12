import React from "react";
import FunctionCard from "../components/organisms/FunctionCard";
import MainVisual from "../components/organisms/MainVisual";
import NavBar from "../components/organisms/NavBar";
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
  return (
    <Main2Container>
      <Main2Wrapper>
        <MainVisual />
        <FunctionCard />
      </Main2Wrapper>
    </Main2Container>
  );
};

export default Main2;
