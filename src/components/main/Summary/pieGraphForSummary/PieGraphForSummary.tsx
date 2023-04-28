import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import {
  getChatTimes,
  getReplyTimes,
  getSpeakers,
} from "../../../../module/common/getProperties";
import { setSelectedChatRoomIndex } from "../../../../store/reducer/selectedRoomIndexSlice";
import {
  AnalyzedMessage,
  ChatTimes,
  PieChartData,
  ReplyTime,
} from "../../../../@types/index.d";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const getTotalChatCounts = (chatTimes: any[]) => {
  let totalChatCounts = [];
  for (const chatroom of chatTimes) {
    const times = chatroom.flat();
    const timeSum = times.map((time: any) =>
      Object.values(time).reduce((a: any, b: any) => a + b)
    );
    totalChatCounts.push(timeSum.reduce((a: any, b: any) => a + b));
  }
  return totalChatCounts;
};

const PieChartExample = () => {
  const dispatch = useDispatch();
  const analyzedMessages = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) =>
      state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );

  const getTwoLettersFromSpeakers = (speakers: string[][]) => {
    let chatRoomNames: string[] = [];
    for (const chatroom of speakers) {
      chatRoomNames.push(
        chatroom.map((speakerName: string) => speakerName.slice(0, 2)).join()
      );
    }
    return chatRoomNames;
  };
  const speakers: string[][] = getSpeakers(analyzedMessages);
  const chatRoomNames: string[] = getTwoLettersFromSpeakers(speakers);

  const chatTimes: ChatTimes[][][] = getChatTimes(analyzedMessages);
  const totalChatCounts: number[] = getTotalChatCounts(chatTimes);

  const pitChartData: PieChartData[] = chatRoomNames.map((name, index) => {
    return {
      name: name,
      value: totalChatCounts[index],
    };
  });

  useEffect(() => {
    console.log(pitChartData, "pitChartData");
    // console.log(analyzedMessages, "analyzedMessages");
    // console.log(getSpeakers(analyzedMessages), "getSpeakers");
    // console.log(getChatTimes(analyzedMessages), "getChatTimes");
    // console.log(getKeywordCounts(analyzedMessages), "getKeywordCounts");
    // console.log(getReplyTimes(analyzedMessages), "getReplyTimes");
    // console.log(getDates(analyzedMessages), "getDates");
  }, [analyzedMessages]);

  const handleClickChatRoom = (index: number) => {
    dispatch(setSelectedChatRoomIndex(index));
  };

  const [selectedChatRoomData, setSelectedChatRoomData] = useState<any>(null);

  const calculateMostChattedTime = (
    chatTimes: any,
    mostChattedTimeArray: any,
    chatroomIndex: number
  ) => {
    chatTimes.forEach((chatTime: any) => {
      chatTime = Object.entries(chatTime);
      for (let i = 0; i < chatTime.length; i++) {
        const [hour, value] = [chatTime[i][0].slice(0, 2), chatTime[i][1]];
        const currentChatroom = mostChattedTimeArray[chatroomIndex];
        currentChatroom[hour]
          ? (currentChatroom[hour] += value)
          : (currentChatroom[hour] = value);
      }
    });
  };

  const getMostChattedTimes = (chatTimes: any[]) => {
    const mostChattedTimeArray: any = [];
    let chatroomIndex = 0;
    for (const chatroom of chatTimes) {
      mostChattedTimeArray.push({});
      const chatTimes = chatroom.flat();
      calculateMostChattedTime(chatTimes, mostChattedTimeArray, chatroomIndex);
      chatroomIndex++;
    }
    const mostChattedTimes = mostChattedTimeArray.map(
      (chatTimes: Record<string, number>) => {
        return Object.entries(chatTimes).sort(
          (a: any, b: any) => b[1] - a[1]
        )[0];
      }
    );
    return mostChattedTimes;
  };
  const mostChattedTimes = getMostChattedTimes(chatTimes);

  const getAverageReplyTime = (replyTimes: ReplyTime[][][]) => {
    const averageReplyTimeArray: number[][] = [];
    for (const chatroom of replyTimes) {
      const averageReplyTime: number[] = chatroom.map((times: ReplyTime[]) => {
        const averageReplyTime: number = times.reduce(
          (acc: number, cur: ReplyTime) =>
            acc + (cur.difference / cur.count || 0),
          times[0].difference / times[0].count || 0
        );
        return Math.floor(averageReplyTime / times.length);
      });
      averageReplyTimeArray.push(averageReplyTime);
    }
    return averageReplyTimeArray;
  };
  const replyTimes = getReplyTimes(analyzedMessages);
  const averageReplyTime = getAverageReplyTime(replyTimes);

  useEffect(() => {
    setSelectedChatRoomData({
      totalChatCount: totalChatCounts[selectedChatRoomIndex],
      speakerCount: speakers[selectedChatRoomIndex].length,
      speakers: speakers[selectedChatRoomIndex],
      mostChattedTimes: mostChattedTimes[selectedChatRoomIndex],
      averageReplyTime: averageReplyTime[selectedChatRoomIndex],
    });
  }, [selectedChatRoomIndex]);

  useEffect(() => {
    selectedChatRoomData &&
      console.log(selectedChatRoomData, "selectedChatRoomData");
  }, [selectedChatRoomData]);

  return (
    <>
      <PieChart width={400} height={400}>
        <Pie
          data={pitChartData}
          cx={200}
          cy={200}
          innerRadius={0}
          outerRadius={100}
          dataKey="value"
          labelLine
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {pitChartData.map((entry, index) => (
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
          <div>대화 수: {selectedChatRoomData.totalChatCount}</div>
          <div>대화자: {selectedChatRoomData.speakers.join(",")}</div>
          <div>대화자 수: {selectedChatRoomData.speakerCount}</div>
          <div>
            가장 많은 대화 시간대: {selectedChatRoomData.mostChattedTimes[0]}시
            (대화수: {selectedChatRoomData.mostChattedTimes[1]})
          </div>
          <div>
            일 평균 답장 시간
            <div>
              {selectedChatRoomData.speakers.map(
                (speaker: any, index: number) => {
                  return (
                    <div key={index}>
                      {speaker}: {selectedChatRoomData.averageReplyTime[index]}
                      초
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PieChartExample;
