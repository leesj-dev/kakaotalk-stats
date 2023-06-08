import styled from "styled-components";

const ParagraphComponent = styled.p<{ fontSize?: string; lineHeight?: string }>`
  display: flex;
  flex-direction: column;
  font-size: ${(props) => props.fontSize || "16px"};
  color: ${(props) => props.color || props.theme.mainGrey};
  line-height: ${(props) => props.lineHeight || "1"};
`;

interface ParagraphProps {
  children: React.ReactNode;
  fontSize?: string; // fontSize 속성을 선택적으로 설정
  color?: string; // color 속성을 설정
  lineHeight?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ children, fontSize, color, lineHeight }) => {
  return (
    <ParagraphComponent fontSize={fontSize} color={color} lineHeight={lineHeight}>
      {children}
    </ParagraphComponent>
  );
};

export default Paragraph;
