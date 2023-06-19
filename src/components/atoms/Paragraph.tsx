import styled from "styled-components";

const ParagraphComponent = styled.p<{ fontSize?: string; lineHeight?: string; fontWeight?: string }>`
  display: flex;
  flex-direction: column;
  font-size: ${(props) => props.fontSize || "16px"};
  font-weight: ${(props) => props.fontWeight || "300"};
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight || "1"};
  letter-spacing: 0.01em;
`;

interface ParagraphProps {
  children: React.ReactNode;
  fontSize?: string; // fontSize 속성을 선택적으로 설정
  color?: string; // color 속성을 설정
  lineHeight?: string;
  fontWeight?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ children, fontSize, color, lineHeight, fontWeight }) => {
  return (
    <ParagraphComponent
      fontSize={fontSize}
      color={color}
      lineHeight={lineHeight}
      fontWeight={fontWeight}
    >
      {children}
    </ParagraphComponent>
  );
};

export default Paragraph;
