import React from "react";
import MainTitle from "../atoms/MainTitle";
import SubTitle from "../atoms/SubTitle";

const Title = () => {
  return (
    <div>
      <MainTitle title={"기능 첫번째"} />
      <SubTitle title={"첫번째 기능은 뭐 저러쿵"} />
    </div>
  );
};

export default Title;
