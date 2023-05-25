import React from "react";
import styled from "styled-components";
import Span from "../atoms/Span";
const Wrap = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.backgroundGrey};
`;
const Container = styled.div`
  margin: 0 auto;
  width: 1200px;
  padding: 30px 0;
`;

const Footer = () => {
  return (
    <Wrap>
      <Container>
        <Span fontSize="100px">ㅇ0ㅇ🐰🐨🦝🐭🐮🐴🐰🐲🐍</Span>
      </Container>
    </Wrap>
  );
};

export default Footer;
