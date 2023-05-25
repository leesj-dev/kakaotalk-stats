import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AnalyzedMessage, ChatTimes, ReplyStackedAreaGraph } from "../../../@types/index.d";
import { getChatTimes, getSpeakers } from "../../../module/common/getProperties";
import { lightTheme } from "../../../style/Theme";
import colorsForGraphArray from "../../../module/common/colorsForGraphArray";

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

const ReplyCountByHourlyGraph = () => {
  const analyzedMessages = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );
  const selectedSpeakerIndex = useSelector(
    (state: { selectedSpeakerIndexSlice: number }) => state.selectedSpeakerIndexSlice
  );

  const chatTimes: ChatTimes[][][] = getChatTimes(analyzedMessages);
  const speakers: string[] = getSpeakers(analyzedMessages)[selectedChatRoomIndex];
  const speakerChatTimes = chatTimes[selectedChatRoomIndex].map((speaker) => getSumTimeCount(speaker));

  const stackedAreaData: ReplyStackedAreaGraph[] = Array(24)
    .fill({})
    .map((_, i) => ({
      name: i.toString().padStart(2, "0"),
    }));

  speakerChatTimes.forEach((speakerChatTime, speakerIndex) => {
    speakerChatTime.forEach(([time, value]: any) => {
      const speakerData = stackedAreaData[Number(time)];
      speakerData[speakers[speakerIndex]] = value || 0;
    });
  });

  useEffect(() => {}, [selectedChatRoomIndex]);

  return (
    <>
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
                key={index}
                type="monotone"
                dataKey={speaker}
                stackId="1"
                stroke={colorsForGraphArray[index % colorsForGraphArray.length]}
                fill={colorsForGraphArray[index % colorsForGraphArray.length]}
                fillOpacity={selectedSpeakerIndex === index ? 1 : 0.4}
                style={{ cursor: "pointer", transition: "ease-in-out 0.7s" }}
              />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default ReplyCountByHourlyGraph;
