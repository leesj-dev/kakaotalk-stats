import styled from "styled-components";

const SpanComponent = styled.span<{ fontSize?: string; fontWeight?: string }>`
  font-size: ${(props) => props.fontSize || "16px"};
  font-weight: ${(props) => props.fontWeight || "400"};
  color: ${(props) => props.color || props.theme.mainText};
`;

interface SpanProps {
  children: React.ReactNode;
  fontWeight?: string;
  fontSize?: string; // fontSize 속성을 선택적으로 설정
  color?: string; // color 속성을 설정
}

const Span: React.FC<SpanProps> = ({ children, fontSize, fontWeight, color }) => {
  return (
    <SpanComponent fontSize={fontSize} fontWeight={fontWeight} color={color}>
      {children}
    </SpanComponent>
  );
};

export default Span;
