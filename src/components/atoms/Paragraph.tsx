import styled from "styled-components";

const ParagraphComponent = styled.p<{ fontSize?: string }>`
  font-size: ${(props) => props.fontSize || "16px"};
  color: ${(props) => props.color || props.theme.mainText};
`;

interface ParagraphProps {
  children: React.ReactNode;
  fontSize?: string; // fontSize 속성을 선택적으로 설정
  color?: string; // color 속성을 설정
}

const Paragraph: React.FC<ParagraphProps> = ({ children, fontSize, color }) => {
  return (
    <ParagraphComponent fontSize={fontSize} color={color}>
      {children}
    </ParagraphComponent>
  );
};

export default Paragraph;
