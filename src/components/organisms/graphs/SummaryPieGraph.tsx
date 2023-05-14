import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { getChatTimes, getReplyTimes, getSpeakers } from "../../../module/common/getProperties";
import { setSelectedChatRoomIndex } from "../../../store/reducer/selectedRoomIndexSlice";
import {
  AnalyzedMessage,
  ChatTimes,
  NameValuePair,
  ReplyTime,
  StringNumberTuple,
  selectedChatRoomData,
} from "../../../@types/index.d";
import GraphInformation from "../../molecules/GraphInformation";
import styled from "styled-components";
import { setAverageReplyTime } from "../../../store/reducer/averageReplyTimeSlice";
import { reduceAPlusB } from "../../../module/common/reduceAPlusB";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const getTotalChatCounts = (chatTimes: ChatTimes[][][]) => {
  let totalChatCounts: number[] = [];
  for (const chatroom of chatTimes) {
    const times: ChatTimes[] = chatroom.flat();
    const timeSum: number[] = times.map((time: ChatTimes) => reduceAPlusB(Object.values(time)));
    totalChatCounts.push(reduceAPlusB(timeSum));
  }
  return totalChatCounts;
};

const TestDiv = styled.div`
  display: flex;
`;

const getTwoLettersFromSpeakers = (speakers: string[][]) => {
  let chatRoomNames: string[] = [];
  for (const chatroom of speakers) {
    chatRoomNames.push(chatroom.map((speakerName: string) => speakerName.slice(0, 2)).join());
  }
  return chatRoomNames;
};

const calculateMostChattedTime = (
  chatTimes: ChatTimes[],
  mostChattedTimeArray: ChatTimes[],
  chatroomIndex: number
) => {
  chatTimes.forEach((chatTime: ChatTimes) => {
    const chatTimeEntry = Object.entries(chatTime);
    for (let i = 0; i < chatTimeEntry.length; i++) {
      const hour: string = chatTimeEntry[i][0].slice(0, 2);
      const value: number = chatTimeEntry[i][1];
      const currentChatroom: ChatTimes = mostChattedTimeArray[chatroomIndex];
      currentChatroom[hour] ? (currentChatroom[hour] += value) : (currentChatroom[hour] = value);
    }
  });
};

export const getMostChattedTimes = (chatTimes: ChatTimes[][][]) => {
  const mostChattedTimeArray: ChatTimes[] = [];
  let chatroomIndex: number = 0;
  for (const chatroom of chatTimes) {
    mostChattedTimeArray.push({});
    const chatTimes: ChatTimes[] = chatroom.flat();
    calculateMostChattedTime(chatTimes, mostChattedTimeArray, chatroomIndex);
    chatroomIndex++;
  }
  const mostChattedTimes: StringNumberTuple[][] = mostChattedTimeArray.map((chatTimes: ChatTimes) => {
    return Object.entries(chatTimes).sort((a: StringNumberTuple, b: StringNumberTuple) => b[1] - a[1]);
  });
  return mostChattedTimes;
};

const getAverageReplyTime = (replyTimes: ReplyTime[][][]) => {
  const averageReplyTimeArray: number[][] = [];
  for (const chatroom of replyTimes) {
    const averageReplyTime: number[] = chatroom.map((times: ReplyTime[]) => {
      const averageReplyTime: number = times.reduce(
        (acc: number, cur: ReplyTime) => acc + (cur.difference / cur.count || 0),
        times[0].difference / times[0].count || 0
      );
      return Math.floor(averageReplyTime / times.length);
    });
    averageReplyTimeArray.push(averageReplyTime);
  }
  return averageReplyTimeArray;
};

const SummaryPieGraph = () => {
  const dispatch = useDispatch();
  const analyzedMessages = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );
  const [selectedChatRoomData, setSelectedChatRoomData] = useState<selectedChatRoomData | null>(null);

  const speakers: string[][] = getSpeakers(analyzedMessages);
  const chatRoomNames: string[] = getTwoLettersFromSpeakers(speakers);
  const chatTimes: ChatTimes[][][] = getChatTimes(analyzedMessages);
  const totalChatCounts: number[] = getTotalChatCounts(chatTimes);
  const pieGraphData: NameValuePair[] = chatRoomNames.map((name, index) => {
    return {
      name: name,
      value: totalChatCounts[index],
    };
  });
  const mostChattedTimes: StringNumberTuple[][] = getMostChattedTimes(chatTimes);
  const replyTimes: ReplyTime[][][] = getReplyTimes(analyzedMessages);
  const averageReplyTime: number[][] = getAverageReplyTime(replyTimes);

  const handleClickChatRoom = (index: number) => {
    dispatch(setSelectedChatRoomIndex(index));
  };
  console.log(mostChattedTimes, "mostChattedTimesmostChattedTimes");
  useEffect(() => {
    setSelectedChatRoomData({
      totalChatCount: totalChatCounts[selectedChatRoomIndex],
      speakerCount: speakers[selectedChatRoomIndex].length,
      speakers: speakers[selectedChatRoomIndex],
      mostChattedTimes: mostChattedTimes[selectedChatRoomIndex],
      averageReplyTime: averageReplyTime[selectedChatRoomIndex],
    });
    dispatch(setAverageReplyTime(averageReplyTime[selectedChatRoomIndex]));
    console.log(selectedChatRoomData, "selectedChatRoomData");
  }, [selectedChatRoomIndex]);

  return (
    <TestDiv>
      <PieChart width={400} height={400}>
        <Pie
          data={pieGraphData}
          cx={200}
          cy={200}
          innerRadius={70}
          outerRadius={100}
          dataKey="value"
          labelLine
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {pieGraphData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              onClick={() => handleClickChatRoom(index)}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="horizontal" />
      </PieChart>
      {selectedChatRoomData && (
        <div>
          <GraphInformation unit={"총 대화 수"} value={selectedChatRoomData.totalChatCount.toString()} />
          <GraphInformation unit={"대화자"} value={selectedChatRoomData.speakers.join(",")} />

          <GraphInformation unit={"대화자 수"} value={selectedChatRoomData.speakerCount.toString()} />
          <GraphInformation
            unit={"가장 많은 대화 시간대"}
            value={`${selectedChatRoomData.mostChattedTimes[0][0]}시 대화수: 
            ${selectedChatRoomData.mostChattedTimes[0][1]}개`}
          />
          {selectedChatRoomData.speakers.map((speaker: string, index: number) => {
            return (
              <GraphInformation
                key={index}
                unit={speaker}
                value={`${selectedChatRoomData.averageReplyTime[index]}초`}
              />
            );
          })}
        </div>
      )}
    </TestDiv>
  );
};

export default SummaryPieGraph;
