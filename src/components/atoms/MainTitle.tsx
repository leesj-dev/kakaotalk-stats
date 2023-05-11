import React from "react";
import styled from "styled-components";
const TitleText = styled.div<{ fontSize?: string }>`
  font-weight: bold;
  font-size: ${(props) => props.fontSize};
  margin-bottom: 30px;
`;
const MainTitle = ({ title }: { title: string }) => {
  return <TitleText fontSize="35px">{title}</TitleText>;
};

export default MainTitle;
