import React from "react";
import Definition from "../atoms/Definition";
import SubTitle from "../atoms/SubTitle";

const CardContent = () => {
  return (
    <div>
      <Definition content={"기능이 이렇궁 저렇궁"} />
      <Definition content={"이 기능을 사용하면 어떻게 그래프가"} />
      <Definition content={"저렇게 나와서 잘보이고 이렇게 나와서"} />
      <Definition content={"아무튼 이렇게 된다는 분석 그래프"} />
      <SubTitle title={"#첫번째 #기능은 #뭐 #저러쿵"} />
    </div>
  );
};

export default CardContent;
