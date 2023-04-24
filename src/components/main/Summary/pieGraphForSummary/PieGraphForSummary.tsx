import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { AnalyzedMessage } from "../../Main";
import { getChatTimes, getDates, getKeywordCounts, getSpeakers, getReplyTimes } from "../../../../module/common/getProperties";
import { setSelectedChatRoomIndex } from "../../../../store/reducer/selectedRoomIndexSlice";

let data = [
  { name: "A", value: 400 },
  { name: "B", value: 300 },
  { name: "C", value: 300 },
  { name: "D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PieChartExample = () => {
  const dispatch = useDispatch();
  const analyzedMessages = useSelector((state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice);
  const selectedChatRoomIndex = useSelector((state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice);

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

  data = chatRoomNames.map((name, index) => {
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
    console.log(mostChattedTime);
  }, [analyzedMessages]);

  const handleClickChatRoom = (index: number) => {
    dispatch(setSelectedChatRoomIndex(index));
  };

  const [selectedChatRoomData, setSelectedChatRoomData] = useState<any>(null);

  interface MostChattedTime {
    [key: string]: number;
  }

  const getMostChattedTimes = (chatTimes: any[]) => {
    const mostChattedTime: any = [];

    for (const chatroom of chatTimes) {
      const chatTimes = chatroom.flat();
      chatTimes.map((chatTime: any) => {
        for (var key in chatTime) {
          mostChattedTime[`${key.slice(0, 2)}`] ? (mostChattedTime[`${key.slice(0, 2)}`] += chatTime[key]) : (mostChattedTime[`${key.slice(0, 2)}`] = chatTime[key]);
        }
      });
      console.log(chatTimes);
    }
    console.log(Object.entries(mostChattedTime), "ssssssss");
    return mostChattedTime;
  };
  const mostChattedTime = getMostChattedTimes(chatTimes);

  useEffect(() => {
    setSelectedChatRoomData({ totalChatCount: totalChatCounts[selectedChatRoomIndex], speakerCount: speakers[selectedChatRoomIndex].length, speakers: speakers[selectedChatRoomIndex] });
  }, [selectedChatRoomIndex]);

  return (
    <>
      <PieChart width={400} height={400}>
        <Pie data={data} cx={200} cy={200} innerRadius={0} outerRadius={100} dataKey="value" labelLine label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} onClick={() => handleClickChatRoom(index)} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="horizontal" />
      </PieChart>
      {selectedChatRoomData && (
        <div>
          <div>대화 수: {selectedChatRoomData.totalChatCount}</div>
          <div>대화자: {selectedChatRoomData.speakers}</div>
          <div>대화자 수: {selectedChatRoomData.speakerCount}</div>
        </div>
      )}
    </>
  );
};

export default PieChartExample;
