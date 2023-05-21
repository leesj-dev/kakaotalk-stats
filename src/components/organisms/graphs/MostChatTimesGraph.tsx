import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AnalyzedMessage, ChatTimes, StringNumberTuple } from "../../../@types/index.d";
import { getChatTimes, getSpeakers } from "../../../module/common/getProperties";
import { getMostChattedTimes } from "./SummaryPieGraph";
import { lightTheme } from "../../../style/Theme";
import colorsForGraphArray from "../../../module/common/colorsForGraphArray";

const MostChatTimesGraph = () => {
  const analyzedMessages = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );

  const chatTimes: ChatTimes[][][] = getChatTimes(analyzedMessages);
  const mostChattedTimes: StringNumberTuple[] = getMostChattedTimes(chatTimes)[selectedChatRoomIndex];
  const sortedTimes: StringNumberTuple[] = mostChattedTimes.sort(
    (a: StringNumberTuple, b: StringNumberTuple) => Number(a[0]) - Number(b[0])
  );

  const data = sortedTimes.map((item: StringNumberTuple) => {
    return { name: item[0], value: item[1] };
  });
  const speakers = getSpeakers(analyzedMessages)[selectedChatRoomIndex];

  const getSumTimeCount = (speaker: ChatTimes[]) => {
    const sumTimeCount: ChatTimes = {};
    speaker.forEach((chatTime) => {
      const timeCountEntry = Object.entries(chatTime);
      timeCountEntry.forEach((item) => {
        sumTimeCount[item[0].slice(0, 2)] = (sumTimeCount[item[0].slice(0, 2)] || 0) + item[1];
      });
    });

    const sumTimeCountEntries = Object.entries(sumTimeCount).sort((a, b) => Number(a[0]) - Number(b[0]));
    return sumTimeCountEntries;
  };

  const speakerChatTimes = chatTimes[selectedChatRoomIndex].map((speaker) => {
    return getSumTimeCount(speaker);
  });
  const stackedAreaData: ChatTimes[] = Array.from({ length: 24 }, () => ({}));

  speakerChatTimes.forEach((speakerChatTime, speakerIndex) => {
    for (let i = 0; i < 24; i++) {
      const currentObject: any = stackedAreaData[i];
      currentObject["name"] = i.toString().padStart(2, "0");
    }
    for (let i = 0; i < 24; i++) {
      if (String(speakerChatTime[i]?.[0]) === String(stackedAreaData[i].name)) {
        const [time, value]: any = speakerChatTime[i];
        stackedAreaData[Number(time)][speakers[speakerIndex]] = value;
      } else {
        stackedAreaData[i][speakers[speakerIndex]] = 0;
      }
    }
    speakerChatTime.forEach((item) => {
      const [time, value]: any = item;
      stackedAreaData[Number(time)][speakers[speakerIndex]] = value;
    });
  });

  console.log(stackedAreaData);

  useEffect(() => {}, [selectedChatRoomIndex]);

  return (
    <>
      시간대별 답장 횟수
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          width={500}
          height={300}
          data={stackedAreaData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {speakers.map((speaker: string, index: number) => {
            return (
              <Area
                type="monotone"
                dataKey={speaker}
                stackId="1"
                stroke={
                  selectedChatRoomIndex === index
                    ? lightTheme.mainBlack
                    : colorsForGraphArray[index % colorsForGraphArray.length]
                }
                strokeWidth={selectedChatRoomIndex === index ? 2 : 1}
                fill={colorsForGraphArray[index % colorsForGraphArray.length]}
              />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default MostChatTimesGraph;
