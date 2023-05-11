import styled from "styled-components";

const SpanComponent = styled.p<{ fontSize?: string }>`
  font-size: ${(props) => props.fontSize || "16px"};
  color: ${(props) => props.color || "#000"};
`;

interface SpanProps {
  children: React.ReactNode;
  fontSize?: string; // fontSize 속성을 선택적으로 설정
  color?: string; // color 속성을 설정
}

const Span: React.FC<SpanProps> = ({ children, fontSize, color }) => {
  return (
    <SpanComponent fontSize={fontSize} color={color}>
      {children}
    </SpanComponent>
  );
};

export default Span;
