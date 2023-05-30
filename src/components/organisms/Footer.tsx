import React from "react";
import styled from "styled-components";
import Span from "../atoms/Span";
import Paragraph from "../atoms/Paragraph";
const Wrap = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.footerBackground};
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
        <Paragraph fontSize="16px">영한</Paragraph>
        <Paragraph fontSize="16px">gentry_@naver.com</Paragraph>
        <Paragraph fontSize="16px">깃허브</Paragraph>
      </Container>
    </Wrap>
  );
};

export default Footer;
