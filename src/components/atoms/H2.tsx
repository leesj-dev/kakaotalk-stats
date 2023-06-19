import styled from "styled-components";

interface TitleText {
  fontSize?: string; // fontSize 속성을 선택적으로 설정
  subject?: boolean;
  darkMode?: boolean;
}

const H2 = styled.h2<TitleText>`
  font-size: ${(props) => props.fontSize || "30px"};
`;

export default H2;
