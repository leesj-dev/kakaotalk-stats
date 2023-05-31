import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Area, Tooltip } from "recharts";
import { AnalyzedMessage, ChatTimes, StackBarData } from "../../../@types/index.d";
import { getChatTimes, getDates, getSpeakers } from "../../../module/common/getProperties";
import { getNotDuplicatedChatDates } from "./ChatVolumeByPeriodGraph";
import { colorsForGraphArray } from "../../../module/common/colorsForGraphArray";
import styled from "styled-components";

const sumChatCountsDay = (chatCountsDay: ChatTimes) => {
  return Object.values(chatCountsDay).reduce((sum, count) => sum + count, 0);
};

const toPercent = (decimal: number, fixed = 0) => `${decimal * 100}%`;

const getPercent = (value: number, total: number) => {
  const ratio = total > 0 ? value / total : 0;
  return toPercent(ratio, 2);
};

const createStackBarData = (chatSpeakers: string[], chatDates: string[], chatTimes: ChatTimes[][]) => {
  const notDuplicatedChatDates = getNotDuplicatedChatDates(chatDates);
  return notDuplicatedChatDates.map((date) => {
    const stackBarData: StackBarData = { name: date };
    chatSpeakers.forEach((speaker, speakerIndex) => {
      const dateIndex = chatDates[speakerIndex].indexOf(date);
      const chatCounts = dateIndex !== -1 ? sumChatCountsDay(chatTimes[speakerIndex][dateIndex]) : 0;
      stackBarData[speaker] = chatCounts;
    });
    return stackBarData;
  });
};

const TooltipBox = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: #fff;
  > ul {
    > li {
      margin-bottom: 5px;
    }
  }
`;

const renderTooltipContent = (o: any) => {
  const { payload, label } = o;
  const total = payload.reduce((result: any, entry: { value: any }) => result + entry.value, 0);
  return (
    <TooltipBox className="customized-tooltip-content">
      <p className="total">{`${label} (Total: ${total})`}</p>
      <ul className="list">
        {payload.map((entry: { color: any; name: any; value: number }, index: any) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}(${getPercent(entry.value, total).slice(0, 2)})`}
          </li>
        ))}
      </ul>
    </TooltipBox>
  );
};

const ChatRateGraph = () => {
  const results = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );
  const selectedSpeakerIndex = useSelector(
    (state: { selectedSpeakerIndexSlice: number }) => state.selectedSpeakerIndexSlice
  );

  const [data, setData] = useState<StackBarData[]>([]);
  const chatSpeakers = getSpeakers(results)[selectedChatRoomIndex];
  const chatDates: string[] = getDates(results)[selectedChatRoomIndex];
  const chatTimes: ChatTimes[][] = getChatTimes(results)[selectedChatRoomIndex];

  useEffect(() => {
    setData(createStackBarData(chatSpeakers, chatDates, chatTimes));
  }, [selectedChatRoomIndex]);

  useEffect(() => {}, [selectedSpeakerIndex]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        stackOffset="expand"
        margin={{
          top: 0,
          right: 5,
          left: -20,
          bottom: -5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" fontSize={12} />
        <YAxis tickFormatter={toPercent} fontSize={12} />

        <Tooltip content={renderTooltipContent} />
        {chatSpeakers.map((speaker: string, index: number) => {
          return (
            <Area
              key={index}
              type="monotone"
              dataKey={speaker}
              stackId="1"
              stroke={colorsForGraphArray[index % colorsForGraphArray.length]}
              fill={colorsForGraphArray[index % colorsForGraphArray.length]}
              strokeWidth={selectedSpeakerIndex === -1 ? 1 : selectedSpeakerIndex === index ? 0 : 0.3}
              fillOpacity={selectedSpeakerIndex === -1 ? 1 : selectedSpeakerIndex === index ? 1 : 0.4}
              style={{ transition: "ease-in-out 0.7s" }}
            />
          );
        })}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ChatRateGraph;
