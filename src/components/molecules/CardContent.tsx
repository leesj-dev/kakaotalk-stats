import React, { ReactNode } from "react";
import styled from "styled-components";
import Paragraph from "../atoms/Paragraph";
import H2 from "../atoms/H2";
import H3 from "../atoms/H3";

const Description = styled.div`
  > :first-child {
    font-size: 24px;
    margin-bottom: 15px;
  }
  > :nth-child(2) {
    font-size: 14px;
    margin-bottom: 25px;
  }
  > :last-child {
    font-size: 16px;
  }
`;
interface CardContentProps {
  h2: string;
  h3: string;
  p: string;
}

const CardContent: React.FC<CardContentProps> = ({ h2, h3, p }) => {
  return (
    <Description>
      <H2>{h2}</H2>
      <H3 lineHeight="1.5">{h3}</H3>
      <Paragraph lineHeight="1.5em">{p}</Paragraph>
    </Description>
  );
};

export default CardContent;
