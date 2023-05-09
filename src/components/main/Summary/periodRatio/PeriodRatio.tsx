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
import { AnalyzedMessage, ChatTimes } from "../../../../@types/index.d";
import { getChatTimes, getDates, getSpeakers } from "../../../../module/common/getProperties";

type StackBarData = {
  name: string;
  [key: string]: number | string | undefined;
};

const PeriodRatio = () => {
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

  //   {
  //     name: "230412",
  //     uv: 3490,
  //     rv: 1000,
  //     pv: 4300,
  //     amt: 2100,
  //   },

  const createStackBarData = (chatSpeakers: string[], chatDates: string[], chatTimes: ChatTimes[][]) => {
    const chatDatesSet = new Set(chatDates.flat());
    const NotDuplicatedChatDates = Array.from(chatDatesSet).sort(
      (a: string, b: string) => Number(a) - Number(b)
    );

    const stackBarData: StackBarData[] = [];

    // 날짜만큼 객체데이터를 만들 것이니까 날짜에 대해서 for문을 돌린다.
    for (let i = 0; i < NotDuplicatedChatDates.length; i++) {
      const date: any = { name: NotDuplicatedChatDates[i] };

      chatSpeakers.forEach((speaker: string, speakerIndex: number) => {
        const dateIndex: number = chatDates[speakerIndex].indexOf(NotDuplicatedChatDates[i]);
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
  const colors = ["#6767fe", "#b3ff00"];
  const chatSpeakersColorPair = chatSpeakers.map((speaker: string, index: number) => {
    return [speaker, colors[index % colors.length]];
  });

  useEffect(() => {
    setData(createStackBarData(chatSpeakersColorPair, chatDates, chatTimes));
  }, [selectedChatRoomIndex]);

  // +누르면 보여주는 기준점의 수를 줄이고
  // -누르면 보여주는 기준점의 수를 늘린다

  // 날짜제한

  return (
    <div>
      <ResponsiveContainer width="100%" height={500}>
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
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {chatSpeakersColorPair.map((speaker: string, index: number) => {
            return <Bar key={index} dataKey={speaker[0]} stackId="a" fill={speaker[1]} />;
          })}
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
