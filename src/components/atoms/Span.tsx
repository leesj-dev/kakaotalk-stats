import styled from "styled-components";

const SpanComponent = styled.span<{
  fontSize?: string;
  responsiveFontSize?: string;
  fontWeight?: string;
  textAlign?: string;
  padding?: string;
  marginBottom?: string;
  underline?: boolean;
}>`
  font-size: ${(props) => props.fontSize || "17px"};
  font-size: ${(props) => props.responsiveFontSize};
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

interface SpanProps {
  children: React.ReactNode;
  fontWeight?: string;
  fontSize?: string;
  responsiveFontSize?: string;
  color?: string;
  textAlign?: string;
  padding?: string;
  marginBottom?: string;
  underline?: boolean;
}

const Span: React.FC<SpanProps> = ({
  children,
  fontSize,
  responsiveFontSize,
  fontWeight,
  color,
  textAlign,
  padding,
  marginBottom,
  underline,
}) => {
  return (
    <SpanComponent
      textAlign={textAlign}
      fontSize={fontSize}
      responsiveFontSize={responsiveFontSize}
      fontWeight={fontWeight}
      color={color}
      padding={padding}
      marginBottom={marginBottom}
      underline={underline}
    >
      {children}
    </SpanComponent>
  );
};

export default Span;
