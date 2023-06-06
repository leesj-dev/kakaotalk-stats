import React from "react";
import styled from "styled-components";

const NavigatorContainerStyle = styled.div`
  position: absolute;
  top: 30px;
  display: flex;
  align-items: end;
  height: 100%;
  width: 100%;
  z-index: -1;
`;

const NavigatorContainer = ({ children }: { children: React.ReactNode }) => {
  return <NavigatorContainerStyle>{children}</NavigatorContainerStyle>;
};
export default NavigatorContainer;
