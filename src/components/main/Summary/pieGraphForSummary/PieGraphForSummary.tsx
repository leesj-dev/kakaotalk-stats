import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { getChatTimes, getReplyTimes, getSpeakers } from "../../../../module/common/getProperties";
import { setSelectedChatRoomIndex } from "../../../../store/reducer/selectedRoomIndexSlice";
import {
  AnalyzedMessage,
  ChatTimes,
  NameValuePair,
  ReplyTime,
  selectedChatRoomData,
} from "../../../../@types/index.d";
import GraphInformation from "../../../molecules/GraphInformation";
import styled from "styled-components";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const getTotalChatCounts = (chatTimes: ChatTimes[][][]) => {
  let totalChatCounts: number[] = [];
  for (const chatroom of chatTimes) {
    const times: ChatTimes[] = chatroom.flat();
    const timeSum: number[] = times.map((time: ChatTimes) =>
      Object.values(time).reduce((a: number, b: number) => a + b)
    );
    totalChatCounts.push(timeSum.reduce((a: number, b: number) => a + b));
  }
  return totalChatCounts;
};

const TestDiv = styled.div`
  display: flex;
`;

const PieChartExample = () => {
  const dispatch = useDispatch();
  const analyzedMessages = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );

  const getTwoLettersFromSpeakers = (speakers: string[][]) => {
    let chatRoomNames: string[] = [];
    for (const chatroom of speakers) {
      chatRoomNames.push(chatroom.map((speakerName: string) => speakerName.slice(0, 2)).join());
    }
    return chatRoomNames;
  };
  const speakers: string[][] = getSpeakers(analyzedMessages);
  const chatRoomNames: string[] = getTwoLettersFromSpeakers(speakers);

  const chatTimes: ChatTimes[][][] = getChatTimes(analyzedMessages);
  const totalChatCounts: number[] = getTotalChatCounts(chatTimes);

  const NameValuePair: NameValuePair[] = chatRoomNames.map((name, index) => {
    return {
      name: name,
      value: totalChatCounts[index],
    };
  });

  const handleClickChatRoom = (index: number) => {
    dispatch(setSelectedChatRoomIndex(index));
  };

  const [selectedChatRoomData, setSelectedChatRoomData] = useState<selectedChatRoomData | null>(null);

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

  const getMostChattedTimes = (chatTimes: ChatTimes[][][]) => {
    const mostChattedTimeArray: ChatTimes[] = [];
    let chatroomIndex: number = 0;
    for (const chatroom of chatTimes) {
      mostChattedTimeArray.push({});
      const chatTimes: ChatTimes[] = chatroom.flat();
      calculateMostChattedTime(chatTimes, mostChattedTimeArray, chatroomIndex);
      chatroomIndex++;
    }
    const mostChattedTimes: [string, number][] = mostChattedTimeArray.map((chatTimes: ChatTimes) => {
      return Object.entries(chatTimes).sort(
        (a: [string, number], b: [string, number]) => b[1] - a[1]
      )[0];
    });
    return mostChattedTimes;
  };
  const mostChattedTimes: [string, number][] = getMostChattedTimes(chatTimes);

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
  const replyTimes: ReplyTime[][][] = getReplyTimes(analyzedMessages);
  const averageReplyTime: number[][] = getAverageReplyTime(replyTimes);

  useEffect(() => {
    setSelectedChatRoomData({
      totalChatCount: totalChatCounts[selectedChatRoomIndex],
      speakerCount: speakers[selectedChatRoomIndex].length,
      speakers: speakers[selectedChatRoomIndex],
      mostChattedTimes: mostChattedTimes[selectedChatRoomIndex],
      averageReplyTime: averageReplyTime[selectedChatRoomIndex],
    });
  }, [selectedChatRoomIndex]);

  return (
    <TestDiv>
      <PieChart width={400} height={400}>
        <Pie
          data={NameValuePair}
          cx={200}
          cy={200}
          innerRadius={0}
          outerRadius={100}
          dataKey="value"
          labelLine
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {NameValuePair.map((entry, index) => (
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
            value={`${selectedChatRoomData.mostChattedTimes[0]}시 대화수: 
            ${selectedChatRoomData.mostChattedTimes[1]}개`}
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

export default PieChartExample;
