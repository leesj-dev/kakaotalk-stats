import React from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { AnalyzedMessage } from "../../../@types/index.d";

const COLORS = ["#FF414D", "#FF8991", "#F7ABB1"];

const ChatRatioGraph = () => {
  const results = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );
  // 현재 채팅방 대화자 한명 대화수

  const selectedChatRoomData = results[selectedChatRoomIndex];
  const speakerTotalChatCounts: Record<string, number> = {};
  Object.values(selectedChatRoomData).forEach((chatroom) => {
    Object.values(chatroom).forEach((chat: { chatTimes: any; speaker: string }) => {
      const speaker = chat.speaker;
      if (!speakerTotalChatCounts[speaker]) {
        speakerTotalChatCounts[speaker] = 0;
      }
      const chatTimes = chat.chatTimes;
      const chatCounts = chatTimes ? Object.values(chatTimes) : [];
      const totalChatCount = chatCounts.reduce((acc, count) => Number(acc) + Number(count), 0);
      speakerTotalChatCounts[speaker] += Number(totalChatCount);
    });
  });

  const totalChatCount = Object.values(speakerTotalChatCounts).reduce((a: number, b: number) => a + b);
  const data = Object.entries(speakerTotalChatCounts).map(([name, value]) => ({
    name,
    value: Number(((value / totalChatCount) * 100).toFixed(0)),
  }));

  return (
    <>
      대화비율
      <ResponsiveContainer width="100%" height={"80%"}>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            innerRadius={0}
            outerRadius={100}
            dataKey="value"
            labelLine
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="horizontal" />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default ChatRatioGraph;
