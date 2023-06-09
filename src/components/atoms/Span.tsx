import styled from "styled-components";

const SpanComponent = styled.span<{
  fontSize?: string;
  fontWeight?: string;
  textAlign?: string;
  padding?: string;
  marginBottom?: string;
}>`
  font-size: ${(props) => props.fontSize || "17px"};
  font-weight: ${(props) => props.fontWeight || "400"};
  color: ${(props) => props.color || props.theme.mainText};
  text-align: ${(props) => props.textAlign || "left"};
  padding: ${(props) => props.padding || "0"};
  margin-bottom: ${(props) => props.marginBottom || "0"};
  @media (max-width: 1200px) {
    line-height: 1.3;
  }
`;

interface SpanProps {
  children: React.ReactNode;
  fontWeight?: string;
  fontSize?: string;
  color?: string;
  textAlign?: string;
  padding?: string;
  marginBottom?: string;
}

const Span: React.FC<SpanProps> = ({
  children,
  fontSize,
  fontWeight,
  color,
  textAlign,
  padding,
  marginBottom,
}) => {
  return (
    <SpanComponent
      textAlign={textAlign}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      padding={padding}
      marginBottom={marginBottom}
    >
      {children}
    </SpanComponent>
  );
};

export default Span;
