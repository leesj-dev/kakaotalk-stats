import React from "react";
import styled, { keyframes } from "styled-components";
import Paragraph from "../atoms/Paragraph";

const IndicatorBox = styled.div`
  color: ${(props) => props.theme.mainGrey};
  cursor: pointer;

  > :first-child {
    margin-bottom: 5px;
  }
`;

const MotionBox = styled.div`
  height: 30px;
`;

const scrollAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
`;

const AnimatedIcon = styled.i`
  display: inline-block;
  animation: ${scrollAnimation} 1s linear infinite;
`;

const ScrollIndicator = () => {
  return (
    <IndicatorBox>
      <Paragraph color="mainGray">카카오톡 메시지 내보내기 방법은?</Paragraph>
      <MotionBox>
        <AnimatedIcon>V</AnimatedIcon>
      </MotionBox>
    </IndicatorBox>
  );
};

export default ScrollIndicator;
