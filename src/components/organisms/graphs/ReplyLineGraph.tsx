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
  ComposedChart,
  Bar,
} from "recharts";
import { AnalyzedMessage } from "../../../@types/index.d";
import { getDates, getReplyTimes, getSpeakers } from "../../../module/common/getProperties";
import { ReplyTime } from "../../../@types/index.d";
import { reduceAPlusB } from "../../../module/common/reduceAPlusB";

type LineGraphData = {
  name: string;
  [key: string]: number | string | undefined;
};

const assignScore = (value: number) => {
  if (value >= 0 && value <= 10) {
    return 5;
  } else if (value > 10 && value <= 30) {
    return 4;
  } else if (value > 30 && value <= 60) {
    return 3;
  } else if (value > 60 && value <= 180) {
    return 2;
  } else if (value > 180 && value <= 600) {
    return 1;
  } else if (value > 600 && value <= 1200) {
    return 0;
  } else if (value > 1200 && value <= 3000) {
    return -1;
  } else if (value > 3000 && value <= 6000) {
    return -2;
  } else if (value > 6000 && value <= 12000) {
    return -3;
  } else if (value > 12000 && value <= 30000) {
    return -4;
  } else if (value > 30000) {
    return -5;
  } else {
    return null; // 범위에 속하지 않는 경우, 예외 처리를 위해 null을 반환할 수도 있습니다.
  }
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
        const replyTime = Math.floor(replyTimeDayData.difference / replyTimeDayData.count || 0);
        // date[speaker] = replyTime;
        date[speaker] = assignScore(replyTime);
        date["답장횟수"] = replyTimeDayData.count;
      }
    });
    if (Object.values(date).includes(0)) {
      continue;
    }
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
          date["답장횟수"] = (date["답장횟수"] || 0) + replyTimeDayData.count;
        }
      });
    }
    replyLineGraphData.push(date);
  }

  return replyLineGraphData;
};

const getAverageReplyTime = (displayData: Record<string, number>[]) => {
  const averageDaily = displayData.map((data: Record<string, number>) => {
    const { 답장횟수, ...newData } = data;
    const values = Object.values(newData);
    const averageDaily = reduceAPlusB(values.slice(1)) / (values.length - 1);
    return averageDaily;
  });
  const averageReplyTime = reduceAPlusB(averageDaily) / displayData.length;
  return averageReplyTime;
};

const ReplyLineGraph = () => {
  const analyzedMessages = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );
  const [displayData, setDisplayData] = useState<any[]>([]);

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
      답장속도
      <div onClick={() => setDisplayData(createLineGraphData(chatSpeakers, chatDates, replyTimes))}>
        일간 답장 속도
      </div>
      <div
        onClick={() => setDisplayData(createLineGraphDataWeekly(chatSpeakers, chatDates, replyTimes))}
      >
        주간 답장 속도
      </div>
      <ResponsiveContainer width="100%" height={"80%"}>
        <ComposedChart
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
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="right" dataKey="답장횟수" barSize={20} fill="#413ea0" />
          <ReferenceLine
            y={getAverageReplyTime(displayData)}
            yAxisId="left"
            label="평균답장속도"
            stroke="orange"
          />
          {chatSpeakersColorPair.map((speaker: string, index: number) => {
            return (
              <Line
                key={index}
                yAxisId="left"
                type="monotone"
                dataKey={speaker[0]}
                stroke={speaker[1]}
              />
            );
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
  // return (
  //   <>
  //     답장속도
  //     <div onClick={() => setDisplayData(createLineGraphData(chatSpeakers, chatDates, replyTimes))}>
  //       일간 답장 속도
  //     </div>
  //     <div
  //       onClick={() => setDisplayData(createLineGraphDataWeekly(chatSpeakers, chatDates, replyTimes))}
  //     >
  //       주간 답장 속도
  //     </div>
  //     <ResponsiveContainer width="100%" height={"80%"}>
  //       <LineChart
  //         width={500}
  //         height={300}
  //         data={displayData}
  //         margin={{
  //           top: 20,
  //           right: 50,
  //           left: 20,
  //           bottom: 5,
  //         }}
  //       >
  //         <CartesianGrid strokeDasharray="3 3" />
  //         <XAxis dataKey="name" />
  //         <YAxis />
  //         <Tooltip />
  //         <Legend />
  //         <ReferenceLine y={getAverageReplyTime(displayData)} label="평균답장속도" stroke="orange" />
  //         {chatSpeakersColorPair.map((speaker: string, index: number) => {
  //           return <Line key={index} type="monotone" dataKey={speaker[0]} stroke={speaker[1]} />;
  //         })}
  //       </LineChart>
  //     </ResponsiveContainer>
  //   </>
  // );
};

export default ReplyLineGraph;
