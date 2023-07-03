import React from "react";
import styled from "styled-components";
import { zIndex } from "../../style/specifiedCss/zIndex";
const Container = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  text-align: left;
  &:hover > .tooltip,
  &:active > .tooltip {
    display: block;
  }
`;

const Content = styled.div`
  padding: 10px;
  display: none;
  position: absolute;
  width: 200px;
  left: 10px;
  border: 1px solid ${(props) => props.theme.mainGray};
  background-color: ${(props) => props.theme.mainWhite};
  z-index: ${zIndex.graphTooltip};

  @media (max-width: 700px) {
    right: 10px;
  }
`;

const Tooltip = ({ message, children }: { message: string; children: JSX.Element }) => {
  return (
    <Container>
      {children}
      <Content className="tooltip">{message}</Content>
    </Container>
  );
};

export default Tooltip;
