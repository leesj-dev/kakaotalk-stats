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
import { AnalyzedMessage } from "../../../../@types/index.d";

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

  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );

  const selectedChatRoomData = results[selectedChatRoomIndex];
  const speakerTotalChatCounts: Record<string, number> = {};
  Object.values(selectedChatRoomData).forEach((chatroom) => {
    Object.values(chatroom).forEach(
      (chat: { chatTimes: any; speaker: string; date: string }) => {
        const speaker = chat.speaker;
        const chatDays = chat.date;

        console.log("콘솔로 확인을 해봅시다 :", chat);
        console.log("콘솔로 chatDays확인을 해봅시다 :", chatDays);

        if (!speakerTotalChatCounts[speaker]) {
          speakerTotalChatCounts[speaker] = 0;
        }
      }
    );
  });

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
