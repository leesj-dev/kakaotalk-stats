import React, { useEffect, useState } from "react";
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
import { AnalyzedMessage, ChatTimes } from "../../../@types/index.d";
import { getChatTimes, getDates, getSpeakers } from "../../../module/common/getProperties";
import colorsForGraphArray from "../../../module/common/colorsForGraphArray";

type StackBarData = {
  name: string;
  [key: string]: number | string | undefined;
};

export const getNotDuplicatedChatDates = (chatDates: string[]) => {
  const chatDatesSet = new Set(chatDates.flat());
  const notDuplicatedChatDates = Array.from(chatDatesSet).sort(
    (a: string, b: string) => Number(a) - Number(b)
  );
  return notDuplicatedChatDates;
};

const ChatVolumeGraph = () => {
  const results = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );

  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );

  // const selectedChatRoomData = results[selectedChatRoomIndex];
  // const speakerTotalChatCounts: Record<string, number> = {};
  // Object.values(selectedChatRoomData).forEach((chatroom) => {
  //   Object.values(chatroom).forEach((chat: { chatTimes: any; speaker: string; date: string }) => {
  //     const speaker = chat.speaker;
  //     const chatDays = chat.date;
  //     if (!speakerTotalChatCounts[speaker]) {
  //       speakerTotalChatCounts[speaker] = 0;
  //     }
  //   });
  // });

  const sumChatCountsDay = (chatCountsDay: ChatTimes) => {
    let chatCounts = 0;
    for (const key in chatCountsDay) {
      chatCounts += chatCountsDay[key];
    }
    return chatCounts;
  };

  const createStackBarData = (chatSpeakers: string[], chatDates: string[], chatTimes: ChatTimes[][]) => {
    const notDuplicatedChatDates = getNotDuplicatedChatDates(chatDates);
    const stackBarData: StackBarData[] = [];

    for (let i = 0; i < notDuplicatedChatDates.length; i++) {
      const date: any = { name: notDuplicatedChatDates[i] };
      chatSpeakers.forEach((speaker: string, speakerIndex: number) => {
        const dateIndex: number = chatDates[speakerIndex].indexOf(notDuplicatedChatDates[i]);
        if (dateIndex !== -1) {
          date[speaker[0]] = sumChatCountsDay(chatTimes[speakerIndex][dateIndex]);
        }
      });
      stackBarData.push(date);
    }
    return stackBarData;
  };

  const [data, setData] = useState<StackBarData[]>([]);
  let chatSpeakers = getSpeakers(results)[selectedChatRoomIndex];
  const chatDates = getDates(results)[selectedChatRoomIndex];
  const chatTimes = getChatTimes(results)[selectedChatRoomIndex];
  const chatSpeakersColorPair = chatSpeakers.map((speaker: string, index: number) => {
    return [speaker, colorsForGraphArray[index % colorsForGraphArray.length]];
  });

  useEffect(() => {
    setData(createStackBarData(chatSpeakersColorPair, chatDates, chatTimes));
  }, [selectedChatRoomIndex]);

  // +누르면 보여주는 기준점의 수를 줄이고
  // -누르면 보여주는 기준점의 수를 늘린다

  // 날짜제한

  return (
    <>
      기간 대화량
      <ResponsiveContainer width="100%" height={"90%"}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: -20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip />
          {/* <Legend /> */}
          {chatSpeakersColorPair.map((speaker: string, index: number) => {
            return <Bar key={index} dataKey={speaker[0]} stackId="a" fill={speaker[1]} />;
          })}
        </BarChart>
      </ResponsiveContainer>
      <div>
        {/* <ul>
          <li>월간</li>
          <li>주간</li>
          <li>일간</li>
        </ul> */}
      </div>
    </>
  );
};

export default ChatVolumeGraph;
