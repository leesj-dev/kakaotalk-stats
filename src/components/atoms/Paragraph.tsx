import styled from "styled-components";

interface ParagraphProps {
  fontSize?: string; // fontSize 속성을 선택적으로 설정
  fontWeight?: string;
  lineHeight?: string;
  color?: string; // color 속성을 설정
}

const Paragraph = styled.p<ParagraphProps>`
  display: flex;
  flex-direction: column;
  font-size: ${(props) => props.fontSize || "16px"};
  font-weight: ${(props) => props.fontWeight || "400"};
  line-height: ${(props) => props.lineHeight || "1.1"};
  color: ${(props) => props.color || props.theme.mainText};
  letter-spacing: 0.01em;
`;

export default Paragraph;
