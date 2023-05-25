import React from "react";
import styled from "styled-components";
import ImageCard from "../molecules/ImageCard";
import Icon from "../atoms/Icon";

const ThreeImagesBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 1200px;
  gap: 30px;
`;

export interface CardData {
  src: string;
  text: string;
}

interface ThreeImagesProps {
  srcAndText: CardData[];
}

const ThreeImages = ({ srcAndText }: ThreeImagesProps) => {
  return (
    <ThreeImagesBox>
      <ImageCard src={srcAndText[0].src}>{srcAndText[0].text}</ImageCard>
      <Icon>{">"}</Icon>
      <ImageCard src={srcAndText[1].src}>{srcAndText[1].text}</ImageCard>
      <Icon>{">"}</Icon>
      <ImageCard src={srcAndText[2].src}>{srcAndText[2].text}</ImageCard>
    </ThreeImagesBox>
  );
};

export default ThreeImages;
