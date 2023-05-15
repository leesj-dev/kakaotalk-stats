import React, { useState } from "react";
import styled from "styled-components";
import CardContent from "../molecules/CardContent";
import SlideBtn from "../molecules/SlideBtn";

const Container = styled.div`
  width: 1200px;
  padding: 80px 0;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;
const SlideBox = styled.div`
  width: 50px;
  height: 50px;
  border: none;
  color: ${(props) => props.theme.mainWhite};
  cursor: pointer;
  font-size: 20px;
  z-index: 100;

  > * {
    padding: 15px;
  }
  > :first-child {
    position: absolute;
    right: 40%;
    bottom: 5%;
    background-color: ${(props) => props.theme.mainBlue};
    transform: translateX(-100%);
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  > :last-child {
    position: absolute;
    right: 50%;
    bottom: 16%;
    background-color: ${(props) => props.theme.mainBlue};
    transform: translateY(-100%);
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    transform: scaleY(-1);
  }
`;

const Card = styled.div`
  display: flex;
  border-radius: 10px;
  margin: 0 auto;
  width: 1000px;
  height: 500px;
  box-shadow: 2px 0px 10px 0px #ddd;
  background-color: ${(props) => props.theme.mainWhite};
  position: relative;
  overflow: hidden;
`;

const SideSlide = styled.div`
  height: 100%;
  width: 50%;
  padding: 70px 60px;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.5s ease-in-out;
  border-right: 1px solid ${(props) => props.theme.mainGray};
  > * {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const MainSlide = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  transition: transform 0.5s ease-in-out;
  > * {
    padding: 50px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    height: 100%;
    width: 100%;
  }
`;

interface Props {
  moveScrollPosition: React.MutableRefObject<HTMLDivElement | null>;
}

const functionCardData = [
  { h2: "dd", h3: "aaa", src: "gg", p: "asf" },
  { h2: "dd", h3: "aa", src: "gg", p: "asf" },
  { h2: "dd", h3: "aa", src: "gg", p: "asf" },
];

const FunctionCard = ({ moveScrollPosition }: Props) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const slideCount = 3; // 슬라이드 개수

  const handleSlideChange = (direction: string) => {
    if (direction === "next") {
      setActiveSlideIndex((prevIndex) => (prevIndex + 1) % slideCount);
    } else if (direction === "prev") {
      setActiveSlideIndex(
        (prevIndex) => (prevIndex - 1 + slideCount) % slideCount
      );
    }
  };
  return (
    <Container ref={moveScrollPosition}>
      <Card>
        <MainSlide
          style={{ transform: `translateY(-${activeSlideIndex * 100}%)` }}
        >
          <CardContent />
          <CardContent />
          <CardContent />
        </MainSlide>
        <SideSlide>
          <div>ss</div>
          <div>ss</div>
          <div>ss</div>
        </SideSlide>
        <SlideBox>
          <SlideBtn
            onClick={() => handleSlideChange("prev")}
            direction={"up"}
          />
          <SlideBtn
            onClick={() => handleSlideChange("next")}
            direction={"up"}
          />
        </SlideBox>
      </Card>
    </Container>
  );
};

export default FunctionCard;
