import React from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
const VisualButton = styled.div`
  margin-top: 50px;
  > * {
    margin-right: 30px;
    display: inline-block;
  }
  > :first-child {
    text-decoration: underline;
    text-underline-position: under;
  }
`;
const MainVisualButton = () => {
  return (
    <VisualButton>
      <Button>GET STARTED</Button>
      <Button>READ MORE</Button>
    </VisualButton>
  );
};

export default MainVisualButton;
