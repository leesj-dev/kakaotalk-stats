import React from "react";
import styled, { ThemeConsumer } from "styled-components";
import Paragraph from "../atoms/Paragraph";
import H2 from "../atoms/H2";
import H3 from "../atoms/H3";

const Description = styled.div<{
  fontSize?: string;
}>`
  width: 100%;
  height: 100%;
  > :first-child {
    font-size: ${(props) => props.fontSize || "1.7em"};
    font-size: 1.5vw;
    margin-bottom: 15px;
    font-weight: 500;
  }
  > :nth-child(2) {
    font-size: ${(props) => props.fontSize || "1.2em"};
    margin-bottom: 25px;
  }
  > :last-child {
    font-size: ${(props) => props.fontSize || "1em"};
    font-weight: 300;
  }
`;
interface CardContentProps {
  h2?: string;
  h3: string;
  p: string;
  fontSize?: string;
}

const CardContent: React.FC<CardContentProps> = ({ h2, h3, p, fontSize }) => {
  return (
    <Description>
      {h2 ? <H2>{h2}</H2> : <H2> </H2>}
      <H3 lineHeight="1.5">{h3}</H3>
      <Paragraph lineHeight="1.5em">{p}</Paragraph>
    </Description>
  );
};

export default CardContent;
