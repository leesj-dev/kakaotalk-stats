import React from "react";
import styled from "styled-components";
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
  z-index: 200;
  border: 1px solid ${(props) => props.theme.mainGray};
  background-color: ${(props) => props.theme.mainWhite};

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
