import styled from "styled-components";

interface SpanProps {
  padding?: string;
  marginBottom?: string;
  textAlign?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  underline?: boolean;
}

const Span = styled.span<SpanProps>`
  font-size: ${(props) => props.fontSize || "17px"};
  font-weight: ${(props) => props.fontWeight || "400"};
  color: ${(props) => props.color || props.theme.mainText};
  text-align: ${(props) => props.textAlign || "left"};
  padding: ${(props) => props.padding || "0"};
  margin-bottom: ${(props) => props.marginBottom || "0"};

  &:hover {
    text-decoration: ${(props) => (props.underline ? "underline" : "none")};
  }
  @media (max-width: 1200px) {
    line-height: 1.3;
  }
`;

export default Span;
