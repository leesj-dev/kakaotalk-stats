import React from "react";
import styled from "styled-components";

const SpanComponent = styled.span``;

interface SpanProps {
  children: React.ReactNode;
}

const Span: React.FC<SpanProps> = ({ children }) => {
  return <SpanComponent>{children}</SpanComponent>;
};

export default Span;
