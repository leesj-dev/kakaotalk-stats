import styled from "styled-components";

interface H3Props {
  fontSize?: string; // fontSize 속성을 선택적으로 설정
  lineHeight?: string;
}

const H3 = styled.h3<H3Props>`
  font-size: ${(props) => props.fontSize || "20px"};
  line-height: 1.2;
`;

export default H3;
