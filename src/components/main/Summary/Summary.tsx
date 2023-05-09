import React from "react";
import DateForm from "../../datePicker/dateForm";
import PeriodRatio from "./periodRatio/PeriodRatio";
import PieChartExample from "./pieGraphForSummary/PieGraphForSummary";
import Ratio from "./ratio/Ratio";
import Timezone from "./timezone/Timezone";

const Summary = () => {
  return (
    <div>
      서마리
      <DateForm />
      <PieChartExample />
      <Ratio />
      <PeriodRatio />
      <Timezone />
    </div>
  );
};

export default Summary;
