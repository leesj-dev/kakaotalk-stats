import React from "react";
import styled from "styled-components";
const TitleText = styled.h2<{ fontSize?: string }>`
  font-weight: bold;
  font-size: ${(props) => props.fontSize};
  margin-bottom: 30px;
`;
const MainTitle = ({ title }: { title: string }) => {
  return <TitleText fontSize="36px">{title}</TitleText>;
};

export default MainTitle;
