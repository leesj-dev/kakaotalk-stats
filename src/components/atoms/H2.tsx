import React from "react";
import styled from "styled-components";
const TitleText = styled.h2<{ fontSize?: string }>`
  font-weight: bold;
  font-size: ${(props) => props.fontSize};
  margin-bottom: 30px;
`;
interface H2Props {
  children: React.ReactNode;
  fontSize?: string; // fontSize 속성을 선택적으로 설정
}

const H2: React.FC<H2Props> = ({ children, fontSize }) => {
  return <TitleText fontSize="36px">{children}</TitleText>;
};

export default H2;
