import React from "react";
import styled from "styled-components";
import Img from "../atoms/Img";
import Paragraph from "../atoms/Paragraph";

const ImageCardBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 500px;

  > :first-child {
    margin-bottom: 10px;
  }

  > :nth-child(2) {
    margin-bottom: 10px;
  }
`;

const ImageCard = () => {
  return (
    <ImageCardBox>
      <Img />
      <Paragraph>이렇게 합니다</Paragraph>
    </ImageCardBox>
  );
};

export default ImageCard;
