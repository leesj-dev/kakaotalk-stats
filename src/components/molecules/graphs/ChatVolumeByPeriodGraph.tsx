import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { ChatTimes, GraphPropsInterface } from "../../../@types/index.d";
import { getChatTimes, getDates, getSpeakers } from "../../../module/common/getProperties";
import { colorsForGraphArray, customTickColor } from "../../../module/common/colorsForGraphArray";
import NavigatorContainer from "../dashboard/GraphNavigatorContainer";
import { graphTooltipStyle } from "../../../style/specifiedCss/graphTooltip";
import getIsParentGraphContentBox from "../../../module/common/getIsParentGraphContentBox";

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
        date[speaker] = sumChatCountsDay(chatTimes[speakerIndex][dateIndex]);
      }
    });
    stackBarData.push(date);
  }
  return stackBarData;
};

let chatSpeakers: any;
let chatDates: any;
let chatTimes: any;

const ChatVolumeByPeriodGraph = ({ analyzedMessages, selectedChatRoomIndex }: GraphPropsInterface) => {
  const parentRef = useRef<React.RefObject<HTMLElement>>(null);

  const selectedSpeakerIndex = useSelector(
    (state: { selectedSpeakerIndexSlice: number }) => state.selectedSpeakerIndexSlice
  );

  const [data, setData] = useState<StackBarData[]>([]);

  const isParentGraphContentBox: boolean = getIsParentGraphContentBox(parentRef);

  useEffect(() => {
    setData([]);
  }, [selectedChatRoomIndex]);

  if (!data.length) {
    chatSpeakers = getSpeakers(analyzedMessages)[selectedChatRoomIndex];
    chatDates = getDates(analyzedMessages)[selectedChatRoomIndex];
    chatTimes = getChatTimes(analyzedMessages)[selectedChatRoomIndex];
    setData(createStackBarData(chatSpeakers, chatDates, chatTimes));
  }

  return (
    <>
      <ResponsiveContainer width="100%" height={"100%"} ref={parentRef}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 0,
            right: 5,
            left: -20,
            bottom: -10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" fontSize={12} tick={customTickColor} />
          <YAxis fontSize={12} tick={customTickColor} />
          <Tooltip contentStyle={graphTooltipStyle} />
          {chatSpeakers.map((speaker: string, index: number) => {
            return (
              <Bar
                key={index}
                dataKey={speaker}
                stackId="a"
                stroke={colorsForGraphArray[index % colorsForGraphArray.length]}
                strokeWidth={selectedSpeakerIndex === -1 ? 1 : 0}
                fill={colorsForGraphArray[index % colorsForGraphArray.length]}
                fillOpacity={
                  selectedSpeakerIndex === -1 ? 0.85 : selectedSpeakerIndex === index ? 1 : 0.4
                }
                animationDuration={300}
              />
            );
          })}
          {isParentGraphContentBox && (
            <Brush
              fill={`var(--brushFill)`}
              height={65}
              startIndex={Math.floor(data.length * 0.75)}
              stroke={`var(--brushStroke)`}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
      {isParentGraphContentBox && (
        <NavigatorContainer>
          <ResponsiveContainer width="100%" height={101}>
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 16,
                right: 5,
                left: -20,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} tick={customTickColor} />
              <YAxis fontSize={12} tick={customTickColor} />
              <Tooltip />
              {chatSpeakers.map((speaker: string, index: number) => {
                return (
                  <Bar
                    key={index}
                    dataKey={speaker}
                    stackId="a"
                    stroke={colorsForGraphArray[index % colorsForGraphArray.length]}
                    strokeWidth={selectedSpeakerIndex === -1 ? 1 : 0}
                    fill={colorsForGraphArray[index % colorsForGraphArray.length]}
                    fillOpacity={
                      selectedSpeakerIndex === -1 ? 0.85 : selectedSpeakerIndex === index ? 1 : 0.4
                    }
                    style={{ transition: "ease-in-out 0.7s" }}
                    animationDuration={300}
                  />
                );
              })}
            </BarChart>
          </ResponsiveContainer>
        </NavigatorContainer>
      )}
    </>
  );
};

export default ChatVolumeByPeriodGraph;
