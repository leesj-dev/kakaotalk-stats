import React from "react";
import styled from "styled-components";
import ImageCard from "../molecules/ImageCard";

const ThreeImagesBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 10px;
  max-width: 1220px;
  min-width: 769px;
  height: 100%;
  gap: 30px;
  > * {
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 1024px) {
    width: calc(60%);
    flex-direction: column;
    min-width: 360px;
  }
  @media (max-width: 768px) {
    width: calc(80%);
    min-width: 360px;
  }
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
      {srcAndText.map((item) => {
        return <ImageCard src={item.src}>{item.text}</ImageCard>;
      })}
    </ThreeImagesBox>
  );
};

export default ThreeImages;
