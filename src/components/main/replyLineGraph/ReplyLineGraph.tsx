import React, { PureComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { AnalyzedMessage, selectedChatRoomData } from "../../../@types/index.d";
import { getDates, getReplyTimes, getSpeakers } from "../../../module/common/getProperties";
import { ReplyTime } from "../../../@types/index.d";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

type LineGraphData = {
  name: string;
  [key: string]: number | string | undefined;
};

const createLineGraphData = (chatSpeakers: string[], chatDates: string[], replyTimes: ReplyTime[][]) => {
  const chatDatesSet = new Set(chatDates.flat());
  const NotDuplicatedChatDates = Array.from(chatDatesSet);

  const replyLineGraphData: LineGraphData[] = [];

  // 날짜만큼 객체데이터를 만들 것이니까 날짜에 대해서 for문을 돌린다.
  for (let i = 0; i < NotDuplicatedChatDates.length; i++) {
    const date: any = { name: NotDuplicatedChatDates[i] };

    chatSpeakers.forEach((speaker: string, speakerIndex: number) => {
      const dateIndex: number = chatDates[speakerIndex].indexOf(NotDuplicatedChatDates[i]);
      const replyTimeDayData = replyTimes[speakerIndex][dateIndex];
      if (dateIndex !== -1) {
        const replyTime = Math.floor(replyTimeDayData.difference / replyTimeDayData.count);
        date[speaker] = replyTime;
      }
    });
    replyLineGraphData.push(date);
  }
  console.log(replyLineGraphData);
  return replyLineGraphData;
};

const ReplyLineGraph = () => {
  const analyzedMessages = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );
  const [replyLineGraphData, setReplyLineGraphData] = useState<LineGraphData[]>([]);

  const replyTimes = getReplyTimes(analyzedMessages)[selectedChatRoomIndex];
  const chatSpeakers = getSpeakers(analyzedMessages)[selectedChatRoomIndex];
  const chatDates = getDates(analyzedMessages)[selectedChatRoomIndex];
  const colors = ["#8884d8", "#82ca9d"];
  const chatSpeakersColorPair = chatSpeakers.map((speaker: string, index: number) => {
    return [speaker, colors[index % colors.length]];
  });

  useEffect(() => {
    setReplyLineGraphData(createLineGraphData(chatSpeakers, chatDates, replyTimes));
  }, [selectedChatRoomIndex]);

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        width={500}
        height={300}
        data={replyLineGraphData}
        margin={{
          top: 20,
          right: 50,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={3000} label="평균답장속도" stroke="yellow" />
        {chatSpeakersColorPair.map((speaker: string, index: number) => {
          return <Line key={index} type="monotone" dataKey={speaker[0]} stroke={speaker[1]} />;
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ReplyLineGraph;
