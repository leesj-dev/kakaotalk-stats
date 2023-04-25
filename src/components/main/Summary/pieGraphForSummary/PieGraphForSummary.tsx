import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { getChatTimes, getDates, getKeywordCounts, getSpeakers, getReplyTimes } from "../../../../module/common/getProperties";
import { setSelectedChatRoomIndex } from "../../../../store/reducer/selectedRoomIndexSlice";
import { AnalyzedMessage } from "../../../../@types/index.d";

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
    // console.log(getSpeakers(analyzedMessages), "getSpeakers");
    console.log(getChatTimes(analyzedMessages), "getChatTimes");
    // console.log(getKeywordCounts(analyzedMessages), "getKeywordCounts");
    // console.log(getReplyTimes(analyzedMessages), "getReplyTimes");
    // console.log(getDates(analyzedMessages), "getDates");
    console.log(mostChattedTimes, "mostChattedTime");
  }, [analyzedMessages]);

  const handleClickChatRoom = (index: number) => {
    dispatch(setSelectedChatRoomIndex(index));
  };

  const [selectedChatRoomData, setSelectedChatRoomData] = useState<any>(null);

  interface MostChattedTime {
    [key: string]: number;
  }

  const getMostChattedTimes = (chatTimes: any[]) => {
    const mostChattedTimeArray: any = [];
    let chatroomIndex = 0;

    for (const chatroom of chatTimes) {
      mostChattedTimeArray.push({});
      const chatTimes = chatroom.flat();

      chatTimes.forEach((chatTime: any) => {
        chatTime = Object.entries(chatTime);
        for (let i = 0; i < chatTime.length; i++) {
          const hour = chatTime[i][0].slice(0, 2);
          const value = chatTime[i][1];
          mostChattedTimeArray[chatroomIndex][hour] ? (mostChattedTimeArray[chatroomIndex][hour] += value) : (mostChattedTimeArray[chatroomIndex][hour] = value);
        }
      });
      chatroomIndex++;
    }

    const mostChattedTimes = mostChattedTimeArray.map((chatTimes: Record<string, number>) => {
      return Object.entries(chatTimes).sort((a: any, b: any) => b[1] - a[1])[0];
    });
    return mostChattedTimes;
  };
  const mostChattedTimes = getMostChattedTimes(chatTimes);

  useEffect(() => {
    setSelectedChatRoomData({
      totalChatCount: totalChatCounts[selectedChatRoomIndex],
      speakerCount: speakers[selectedChatRoomIndex].length,
      speakers: speakers[selectedChatRoomIndex],
      mostChattedTimes: mostChattedTimes[selectedChatRoomIndex],
    });
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
          <div>
            가장 많은 대화 시간대: {selectedChatRoomData.mostChattedTimes[0]} (대화수: {selectedChatRoomData.mostChattedTimes[1]})
          </div>
        </div>
      )}
    </>
  );
};

export default PieChartExample;
