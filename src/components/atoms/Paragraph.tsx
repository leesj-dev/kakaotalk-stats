import styled from "styled-components";

const ParagraphComponent = styled.p<{ fontSize?: string }>`
  font-size: ${(props) => props.fontSize || "16px"};
`;

interface ParagraphProps {
  children: React.ReactNode;
  fontSize?: string; // fontSize 속성을 선택적으로 설정
}

const Paragraph: React.FC<ParagraphProps> = ({ children, fontSize }) => {
  return <ParagraphComponent fontSize={fontSize}>{children}</ParagraphComponent>;
};

export default Paragraph;
