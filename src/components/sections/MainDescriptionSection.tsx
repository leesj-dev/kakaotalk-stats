import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import H2 from "../atoms/H2";
import H3 from "../atoms/H3";
import Img from "../atoms/Img";
import Paragraph from "../atoms/Paragraph";
import { FlexCenterDiv, FlexColumnCenterDiv } from "../styleComponents/FlexDiv";

const Container = styled.div`
  padding: 100px 0px 0px 0px;
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 50px 0px;
    margin-top: 100px;
  }
`;

const CardBox = styled.div`
  padding: 30px;
  width: calc((100% / 3) - (20 * 2px / 3));
  > * {
    align-items: start;
    text-align: start;
  }
  background: ${(props) => props.theme.mainWhite};
  box-shadow: 2px 0px 10px 0px #ddd;
  border-radius: 10px;
  transition: 0.3s;
  &.dark {
    box-shadow: none;
    background: #eeeeee;
  }
  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 0px 7px 1px ${(props) => props.theme.mainBlue};
  }

  @media (max-width: 1200px) {
    width: calc((100% / 2) - (20 * 1px / 2));
  }
  @media (max-width: 768px) {
    width: calc((100% / 1) - (20 * 0px / 1));
  }
`;

const DescriptionBox = styled(FlexColumnCenterDiv)`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.mainBlack};
`;

const Title = styled(H2)`
  font-size: 28px;
  margin-bottom: 10px;
`;

const SubTitle = styled(H3)`
  font-size: 17px;
`;

const functionCardData = [
  {
    id: 1,
    subject: "채팅방 비교",
    h3: "채팅방끼리 비교 해볼까?",
    p: "대화 로그 데이터를 종합적으로 분석한 결과를 시각화하여 보여주는 화면입니다. 대화량, 대화 시간대, 답장 속도, 대화 키워드 등 다양한 정보를 종합하여 분석한 결과를 그래프, 차트, 표 등 다양한 방식으로 표시합니다.",
    img: `${process.env.PUBLIC_URL}/images/graph/ChatRoomCompareGraph.jpg`,
  },
  {
    id: 2,
    subject: "대화량",
    h3: "우리 카톡 언제 많이 했더라?",
    p: "각 기간에 대한 대화량을 시각적으로 표현하여, 대화 활동이 어느 기간에 집중되어 있는지 알 수 있습니다. 이를 통해 특정 기간에 대화가 활발하게 이루어지는 경향이나 트렌드를 파악할 수 있습니다.",
    img: `${process.env.PUBLIC_URL}/images/graph/ChatVolumeByPeriodGraph.jpg`,
  },
  {
    id: 3,
    subject: "대화 비율",
    h3: "누가 말이 제일 많을까?",
    p: "대화에 참여한 인원들 간의 대화량을 나타냅니다. 이를 통해 각각의 인원이 대화에 얼마나 기여하였는지, 대화량이 많은 인원이 어느 정도인지 등을 파악할 수 있습니다.",
    img: `${process.env.PUBLIC_URL}/images/graph/ChatRateGraph.jpg`,
  },

  {
    id: 4,
    subject: "키워드",
    h3: "우리의 문자 습관은?",
    p: "대화 내용에서 자주 등장하는 단어나 문구를 나타냅니다. 이를 통해 대화의 주요 주제나 키워드를 파악할 수 있으며, 이를 활용하여 대화의 내용을 더욱 효율적으로 파악하고 관리할 수 있습니다.",
    img: `${process.env.PUBLIC_URL}/images/graph/keywordGraph.jpg`,
  },
  {
    id: 5,
    subject: "답장속도",
    h3: "누구 답장이 제일 빠르지?",
    p: "상대방이 보낸 메시지에 대한 본인의 답장 속도를 나타냅니다. 이를 통해 메시지에 대한 대응속도가 어느정도인지, 더 빠른 대응이 필요한 상황이 있는지 등을 파악할 수 있습니다.",
    img: `${process.env.PUBLIC_URL}/images/graph/ReplySpeedGraph.jpg`,
  },
  {
    id: 6,
    subject: "시간대",
    h3: "몇 시에 카톡하면 좋아?",
    p: "대화가 발생한 시간대를 나타냅니다. 이를 통해 대화가 활발히 이루어지는 시간대, 그리고 상대방과의 대화 타이밍을 파악할 수 있습니다.",
    img: `${process.env.PUBLIC_URL}/images/graph/ChatVolumeByHourlyGraph.jpg`,
  },
];

interface Props {
  moveScrollPosition: React.MutableRefObject<HTMLDivElement | null>;
}

const MainDescriptionSection = ({ moveScrollPosition }: Props) => {
  const isDarkMode = useSelector((state: { isDarkModeSlice: boolean }) => state.isDarkModeSlice);

  return (
    <Container ref={moveScrollPosition}>
      {functionCardData.map((data, index) => (
        <CardBox className={` ${isDarkMode ? "dark" : ""}`}>
          <DescriptionBox>
            <Title subject>{data.subject}</Title>
            <SubTitle>{data.h3}</SubTitle>
            <Img src={data.img} />
          </DescriptionBox>
        </CardBox>
      ))}
    </Container>
  );
};

export default MainDescriptionSection;
