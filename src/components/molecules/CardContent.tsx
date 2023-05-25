import React, { ReactNode } from "react";
import styled from "styled-components";
import Paragraph from "../atoms/Paragraph";
import H2 from "../atoms/H2";
import H3 from "../atoms/H3";

const Description = styled.div``;
interface CardContentProps {
  h2: string;
  h3: string;
  p: string;
}

const CardContent: React.FC<CardContentProps> = ({ h2, h3, p }) => {
  return (
    <Description>
      <H2>{h2}</H2>
      <H3>{h3}</H3>
      <Paragraph fontSize="15px" lineHeight="1.5em">
        {p}
      </Paragraph>
    </Description>
  );
};

export default CardContent;
