import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { zIndex } from "../../../style/specifiedCss/zIndex";

const NavigatorContainerStyle = styled.div`
  position: absolute;
  top: 30px;
  display: flex;
  align-items: end;
  height: 100%;
  width: 100%;
  z-index: ${zIndex.graphNavigator};
`;

const NavigatorContainer = ({ children }: { children: React.ReactNode }) => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <NavigatorContainerStyle>{children}</NavigatorContainerStyle>;
};
export default NavigatorContainer;
