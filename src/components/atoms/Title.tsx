import React from "react";
import styled from "styled-components";
const Title = styled.div<{ fontSize?: string }>`
  font-weight: bold;
  font-size: ${(props) => props.fontSize};
`;
const FuctionCard = ({ title }: { title: string }) => {
  return <Title>{title}</Title>;
};

export default FuctionCard;
