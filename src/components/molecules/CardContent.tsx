import React from "react";
import styled from "styled-components";
import Paragraph from "../atoms/Paragraph";

const Descript = styled.div`
  line-height: 1.5em;
`;
const CardContent = () => {
  return (
    <Descript>
      <Paragraph fontSize="15px">
        {" "}
        대화량 비율 기능은 채팅 데이터에서 각 사용자의 대화량 비율을 계산하여
        시각화하는 기능입니다. 이 기능을 통해 채팅방의 참여자들이 얼마나
        활발하게 대화를 나누었는지, 각 참여자들의 기여도 등을 쉽게 파악할 수
        있습니다. 대화량 비율을 분석하여 채팅방의 분위기나 톤을 파악하는데도
        유용하게 사용될 수 있습니다. 이를 구현하기 위해서는 채팅 데이터를 적절한
        방식으로 처리하여 각 사용자의 대화량을 계산하고, 이를 그래프나 차트 등의
        시각화 도구를 이용하여 표현할 수 있어야 합니다. 이를 통해 채팅방의
        활성도를 직관적으로 파악할 수 있고, 관리자는 이를 기반으로 적절한 대처를
        취할 수 있습니다.
      </Paragraph>
    </Descript>
  );
};

export default CardContent;
