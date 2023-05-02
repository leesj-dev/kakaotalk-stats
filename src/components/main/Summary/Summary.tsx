import React from "react";
import PeriodRatio from "./periodRatio/PeriodRatio";
import PieChartExample from "./pieGraphForSummary/PieGraphForSummary";
import Ratio from "./ratio/Ratio";
import Timezone from "./timezone/Timezone";

const Summary = () => {
  return (
    <div>
      서마리
      <PieChartExample />
      <Ratio />
      <PeriodRatio />
      <Timezone />
    </div>
  );
};

export default Summary;
