import React, { useEffect, useRef } from "react";
import FunctionCard from "../organisms/FunctionCard";
import MainVisual from "../organisms/MainVisual";
import styled from "styled-components";
import scrollToEvent from "../../module/common/scrollEvent";
import { FlexColumnCenterDiv } from "../styleComponents/FlexDiv";

const MainContainer = styled(FlexColumnCenterDiv)`
  padding: 100px 20px;
  width: 100%;
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
    <MainContainer>
      <MainVisual onMoveToFunctionCard={onMoveToFunctionCard} />
      <FunctionCard moveScrollPosition={moveScrollPosition} />
    </MainContainer>
  );
};

export default MainPage;
