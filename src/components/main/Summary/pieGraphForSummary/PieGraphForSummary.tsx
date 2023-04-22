import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { AnalyzedMessage } from "../../Main";
import { getChatTimes, getDates, getKeywordCounts, getSpeakers, getReplyTimes } from "../../../../module/common/getProperties";

let data = [
  { name: "A", value: 400 },
  { name: "B", value: 300 },
  { name: "C", value: 300 },
  { name: "D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PieChartExample = () => {
  const analyzedMessages = useSelector((state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice);

  const getTwoLettersFromSpeakers = (speakers: string[][]) => {
    let chatRoomNames = [];
    for (const chatroom of speakers) {
      chatRoomNames.push(chatroom.map((speakerName: string) => speakerName.slice(0, 2)).join());
    }
    return chatRoomNames;
  };
  const speakers = getSpeakers(analyzedMessages);
  const chatRoomNames = getTwoLettersFromSpeakers(speakers);

  const getTotalChatCounts = (chatTimes: any[]) => {
    let totalChatCounts = [];
    for (const chatroom of chatTimes) {
      const times = chatroom.flat();
      const timeSum = times.map((time: any) => Object.values(time).reduce((a: any, b: any) => a + b));
      totalChatCounts.push(timeSum.reduce((a: any, b: any) => a + b));
    }
    return totalChatCounts;
  };
  const chatTimes = getChatTimes(analyzedMessages);
  const totalChatCounts = getTotalChatCounts(chatTimes);

  let data = chatRoomNames.map((name, index) => {
    return {
      name: name,
      value: totalChatCounts[index],
    };
  });

  useEffect(() => {
    console.log(analyzedMessages, "analyzedMessages");
    console.log(getSpeakers(analyzedMessages), "getSpeakers");
    console.log(getChatTimes(analyzedMessages), "getChatTimes");
    console.log(getKeywordCounts(analyzedMessages), "getKeywordCounts");
    console.log(getReplyTimes(analyzedMessages), "getReplyTimes");
    console.log(getDates(analyzedMessages), "getDates");
  }, [analyzedMessages]);

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
