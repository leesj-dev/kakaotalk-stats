import React from "react";
import styled from "styled-components";
const TitleText = styled.h3<{ fontSize?: string }>`
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.theme.mainGrey};
  margin-bottom: 50px;
  line-height: 1.5;
`;
interface H3Props {
  children: React.ReactNode;
  fontSize?: string; // fontSize 속성을 선택적으로 설정
  lineHeight: string;
}

const H3: React.FC<H3Props> = ({ children, fontSize }) => {
  return <TitleText fontSize="24px">{children}</TitleText>;
};
export default H3;
