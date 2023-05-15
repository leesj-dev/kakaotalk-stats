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
  border-right: 1px solid ${(props) => props.theme.mainGray};
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
  {
    index: 1,
    h2: "종합 분석화면",
    h3: "대화 데이터를 종합적으로 분석한 결과를 시각화하여 보여주는 화면",
    p: "대화 로그 데이터를 종합적으로 분석한 결과를 시각화하여 보여주는 화면입니다. 대화량, 대화 시간대, 답장 속도, 대화 키워드 등 다양한 정보를 종합하여 분석한 결과를 그래프, 차트, 표 등 다양한 방식으로 표시합니다.",
  },
  {
    index: 2,
    h2: "대화량 비율",
    h3: "대화 참여자별 대화량의 비율을 시각화하여 보여주는 그래프",
    p: "대화에 참여한 각각의 인원이 차지하는 대화량의 비율을 나타냅니다. 이를 통해 어떤 인원이 얼마나 많은 대화를 하였는지, 대화 참여율이 어떻게 되는지 등을 파악할 수 있습니다.",
  },
  {
    index: 3,
    h2: "대화 시간대",
    h3: "대화가 활발히 이루어진 시간대를 시각화하여 보여주는 그래프",
    p: "대화가 발생한 시간대를 나타냅니다. 이를 통해 대화가 활발히 이루어지는 시간대, 그리고 상대방과의 대화 타이밍을 파악할 수 있습니다.",
  },
  {
    index: 4,
    h2: "답장 속도",
    h3: "대화 참여자별  평균 답장 속도를 시각화하여 보여주는 그래프",
    p: "상대방이 보낸 메시지에 대한 본인의 답장 속도를 나타냅니다. 이를 통해 메시지에 대한 대응속도가 어느정도인지, 더 빠른 대응이 필요한 상황이 있는지 등을 파악할 수 있습니다.",
  },
  {
    index: 5,
    h2: "대화 키워드",
    h3: "대화 내용에서 빈도수가 높은 단어를 추출하여 시각화하여 보여주는 워드 클라우드",
    p: "대화 내용에서 자주 등장하는 단어나 문구를 나타냅니다. 이를 통해 대화의 주요 주제나 키워드를 파악할 수 있으며, 이를 활용하여 대화의 내용을 더욱 효율적으로 파악하고 관리할 수 있습니다.",
  },
  {
    index: 6,
    h2: "대화량",
    h3: "대화 참여자별 대화량의 변화를 시간에 따라 시각화하여 보여주는 그래프",
    p: "대화에 참여한 인원들 간의 대화량을 나타냅니다. 이를 통해 각각의 인원이 대화에 얼마나 기여하였는지, 대화량이 많은 인원이 어느 정도인지 등을 파악할 수 있습니다.",
  },
];

const FunctionCard = ({ moveScrollPosition }: Props) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const slideCount = 6; // 슬라이드 개수

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
          {functionCardData.map((data, index) => (
            <CardContent key={index} h2={data.h2} h3={data.h3} p={data.p} />
          ))}
        </MainSlide>
        {/*  style={{ transform: `translateY(${activeSlideIndex * 100}%)` }} */}
        <SideSlide
          style={{ transform: `translateY(-${activeSlideIndex * 100}%)` }}
        >
          {functionCardData.map((data, index) => (
            <div>{data.index}</div>
          ))}
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
