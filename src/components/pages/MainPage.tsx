import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import scrollToEvent from "../../module/common/scrollToEvent";
import MainDescriptionSection from "../sections/main/MainDescriptionSection";
import { FlexColumnCenterDiv } from "../atoms/FlexDiv";
import MainVisual from "../sections/main/MainVisual";

const MainContainer = styled(FlexColumnCenterDiv)`
  padding: 70px 20px;
  width: 100%;
`;

const MainPage = () => {
  const moveScrollPosition = useRef<HTMLDivElement | null>(null);

  const onMoveToFunctionCard = () => {
    if (moveScrollPosition.current) {
      scrollToEvent(moveScrollPosition.current.offsetTop - 100, "smooth");
    }
  };

  useEffect(() => {
    scrollToEvent(0, "auto");
  }, []);

  return (
    <MainContainer>
      <MainVisual onMoveToFunctionCard={onMoveToFunctionCard} />
      <MainDescriptionSection moveScrollPosition={moveScrollPosition} />
    </MainContainer>
  );
};

export default MainPage;
