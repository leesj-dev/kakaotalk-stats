import React from "react";
import styled from "styled-components";
import ImageCard from "../../molecules/attachment/ImageCard";
import { FlexCenterDiv } from "../../atoms/FlexDiv";

const ThreeImagesBox = styled(FlexCenterDiv)`
  padding: 0 10px;
  gap: 30px;
  max-width: 1220px;
  height: 100%;

  @media (max-width: 1024px) {
    flex-direction: column;
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
