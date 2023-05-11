import React from "react";
import styled from "styled-components";

const ParagraphComponent = styled.p``;

interface ParagraphProps {
  children: React.ReactNode;
}

const Paragraph: React.FC<ParagraphProps> = ({ children }) => {
  return <ParagraphComponent>{children}</ParagraphComponent>;
};

export default Paragraph;
