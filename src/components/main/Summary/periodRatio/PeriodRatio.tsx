import React from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PeriodRatio = () => {
  const results = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) =>
      state.analyzedMessagesSlice
  );
  const data = [
    {
      date: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      date: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      date: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      date: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      date: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      date: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      date: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  type AnalyzedMessage = Array<{
    speaker: string;
    date: string;
    chatTimes: Record<string, number>;
  }>;
  // date,speaker:count 구조
  const messageCounts = results.reduce((acc, chatList) => {
    chatList.forEach((chat: { date: string; speaker: string }) => {
      const { date, speaker } = chat;
      const existingData: any = acc.find((data: any) => data.date === date);

      if (existingData) {
        existingData[speaker] = (existingData[speaker] || 0) + 1;
      } else {
        const newData = { date, speaker: { [speaker]: 1 } };
      }
    });
    return acc;
  }, []);

  return (
    <div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" stackId="a" fill="#8884d8" />
          <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
      <div>
        <ul>
          <li>월간</li>
          <li>주간</li>
          <li>일간</li>
        </ul>
      </div>
    </div>
  );
};

export default PeriodRatio;
