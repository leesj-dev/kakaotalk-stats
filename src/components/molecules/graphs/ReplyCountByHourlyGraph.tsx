import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChatTimes, GraphPropsInterface, ReplyStackedAreaGraph } from "../../../@types/index.d";
import { getChatTimes, getSpeakers } from "../../../module/common/getProperties";
import { colorsForGraphArray, customTickColor } from "../../../module/common/colorsForGraphArray";
import { graphTooltipStyle } from "../../../style/specifiedCss/graphTooltip";

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

let chatTimes: ChatTimes[][][];
let speakers: string[];
let speakerChatTimes: any;
let stackedAreaData: ReplyStackedAreaGraph[];

const ReplyCountByHourlyGraph = ({ analyzedMessages, selectedChatRoomIndex }: GraphPropsInterface) => {
  const selectedSpeakerIndex = useSelector(
    (state: { selectedSpeakerIndexSlice: number }) => state.selectedSpeakerIndexSlice
  );

  const [replyCountData, setReplyCountData] = useState<ReplyStackedAreaGraph[]>([]);

  useEffect(() => {
    setReplyCountData([]);
  }, [selectedChatRoomIndex]);

  if (!replyCountData.length) {
    chatTimes = getChatTimes(analyzedMessages);
    speakers = getSpeakers(analyzedMessages)[selectedChatRoomIndex];
    speakerChatTimes = chatTimes[selectedChatRoomIndex].map((speaker) => getSumTimeCount(speaker));

    stackedAreaData = Array(24)
      .fill({})
      .map((_, i) => ({
        name: i.toString().padStart(2),
      }));

    speakerChatTimes.forEach((speakerChatTime: any, speakerIndex: number) => {
      speakerChatTime.forEach(([time, value]: any) => {
        const speakerData = stackedAreaData[Number(time)];
        speakerData[speakers[speakerIndex]] = value || 0;
      });

      for (let i = 0; i < stackedAreaData.length; i++) {
        if (!(speakers[speakerIndex] in stackedAreaData[i])) {
          stackedAreaData[i][speakers[speakerIndex]] = 0;
        }
      }
    });
    setReplyCountData(stackedAreaData);
  }

  return (
    <>
      {replyCountData.length && (
        <ResponsiveContainer width="100%" height="30%">
          <AreaChart
            width={500}
            height={300}
            data={replyCountData}
            margin={{
              top: 5,
              right: 13,
              left: -17,
              bottom: -10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={12} tick={customTickColor} />
            <YAxis width={60} fontSize={12} tick={customTickColor} />
            <Tooltip contentStyle={graphTooltipStyle} />
            {speakers.map((speaker: string, index: number) => {
              return (
                <Area
                  key={index}
                  type="monotone"
                  dataKey={speaker}
                  stackId="1"
                  stroke={colorsForGraphArray[index % colorsForGraphArray.length]}
                  fill={colorsForGraphArray[index % colorsForGraphArray.length]}
                  strokeWidth={selectedSpeakerIndex === -1 ? 1 : 0}
                  fillOpacity={
                    selectedSpeakerIndex === -1 ? 0.85 : selectedSpeakerIndex === index ? 1 : 0.4
                  }
                  style={{ cursor: "pointer", transition: "ease-in-out 0.7s" }}
                  animationDuration={300}
                />
              );
            })}
          </AreaChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default ReplyCountByHourlyGraph;
