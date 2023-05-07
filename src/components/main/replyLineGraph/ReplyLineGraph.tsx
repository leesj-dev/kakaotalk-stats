import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import { AnalyzedMessage } from "../../../@types/index.d";
import { getDates, getReplyTimes, getSpeakers } from "../../../module/common/getProperties";
import { ReplyTime } from "../../../@types/index.d";

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
  return replyLineGraphData;
};

const createLineGraphDataWeekly = (
  chatSpeakers: string[],
  chatDates: string[],
  replyTimes: ReplyTime[][]
) => {
  const chatDatesSet = new Set(chatDates.flat());
  const NotDuplicatedChatDates = Array.from(chatDatesSet);

  const replyLineGraphData: LineGraphData[] = [];

  // 날짜만큼 객체데이터를 만들 것이니까 날짜에 대해서 for문을 돌린다.
  for (let i = 0; i < NotDuplicatedChatDates.length; i += 7) {
    const date: any = { name: NotDuplicatedChatDates[i] };

    // 1개씩 출력한 결과 너무 튀는 경우가 있으므로, 이를 개선하기 위해 7개 메시지 단위로 합산한 결과를 반영한다.
    for (let j = i; j < i + 7 && j < NotDuplicatedChatDates.length; j++) {
      chatSpeakers.forEach((speaker: string, speakerIndex: number) => {
        const dateIndex: number = chatDates[speakerIndex].indexOf(NotDuplicatedChatDates[j]);
        const replyTimeDayData = replyTimes[speakerIndex][dateIndex];
        if (dateIndex !== -1) {
          const replyTime = Math.floor(replyTimeDayData.difference / replyTimeDayData.count) || 0;
          date[speaker] = (date[speaker] || 0) + replyTime;
        }
      });
    }
    replyLineGraphData.push(date);
  }

  return replyLineGraphData;
};

const ReplyLineGraph = () => {
  const analyzedMessages = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );
  // const [replyLineGraphData, setReplyLineGraphData] = useState<LineGraphData[]>([]);
  const [displayData, setDisplayData] = useState<any>();

  const replyTimes = getReplyTimes(analyzedMessages)[selectedChatRoomIndex];
  const chatSpeakers = getSpeakers(analyzedMessages)[selectedChatRoomIndex];
  const chatDates = getDates(analyzedMessages)[selectedChatRoomIndex];
  const colors = ["#8884d8", "#82ca9d"];
  const chatSpeakersColorPair = chatSpeakers.map((speaker: string, index: number) => {
    return [speaker, colors[index % colors.length]];
  });

  useEffect(() => {
    setDisplayData(createLineGraphData(chatSpeakers, chatDates, replyTimes));
  }, [selectedChatRoomIndex]);

  return (
    <>
      <div onClick={() => setDisplayData(createLineGraphData(chatSpeakers, chatDates, replyTimes))}>
        일간 평균 답장 속도
      </div>
      <div
        onClick={() => setDisplayData(createLineGraphDataWeekly(chatSpeakers, chatDates, replyTimes))}
      >
        주간 평균 답장 속도
      </div>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          width={500}
          height={300}
          data={displayData}
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
    </>
  );
};

export default ReplyLineGraph;
