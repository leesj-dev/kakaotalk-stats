import React, { ReactNode } from "react";
import styled, { keyframes } from "styled-components";
import Paragraph from "../../atoms/Paragraph";
import { lightTheme } from "../../../style/Theme";
import Icon from "../../atoms/Icon";
import { FlexColumnCenterDiv } from "../../atoms/FlexDiv";

const IndicatorBox = styled(FlexColumnCenterDiv)`
  text-align: center;
  width: 300px;
  cursor: pointer;

  > * {
    color: ${lightTheme.mainGray};
  }

  @media (max-width: 768px) {
    margin-bottom: -100px;
  }
`;

const Description = styled(Paragraph)`
  margin-bottom: 5px;
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

const AnimatedIcon = styled(Icon)`
  display: inline-block;
  color: ${(props) => props.theme.mainGray};
  animation: ${scrollAnimation} 1s linear infinite;
`;

interface ScrollIndicatorProps {
  children: ReactNode;
  onClick: () => void; // 클릭 이벤트 핸들러 타입 정의
}

const ScrollIndicator = ({ children, onClick }: ScrollIndicatorProps) => {
  return (
    <IndicatorBox onClick={onClick}>
      <Description>{children}</Description>
      <MotionBox>
        <AnimatedIcon>V</AnimatedIcon>
      </MotionBox>
    </IndicatorBox>
  );
};
export default ScrollIndicator;
