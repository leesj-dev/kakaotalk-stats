import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { AnalyzedMessage } from "../../Main";
import { getChatTimes, getDates, getKeywordCounts, getNames, getReplyTimes } from "../../../../module/common/getProperties";

let data = [
  { name: "A", value: 400 },
  { name: "B", value: 300 },
  { name: "C", value: 300 },
  { name: "D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PieChartExample = () => {
  const results = useSelector((state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice);

  useEffect(() => {
    console.log(results, "results");
    console.log(getNames(results), "getNames");
    console.log(getChatTimes(results), "getChatTimes");
    console.log(getKeywordCounts(results), "getKeywordCounts");
    console.log(getReplyTimes(results), "getReplyTimes");
    console.log(getDates(results), "getDates");
  }, [results]);

  return (
    <PieChart width={400} height={400}>
      <Pie data={data} cx={200} cy={200} innerRadius={0} outerRadius={100} dataKey="value" labelLine label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend layout="horizontal" />
    </PieChart>
  );
};

export default PieChartExample;
