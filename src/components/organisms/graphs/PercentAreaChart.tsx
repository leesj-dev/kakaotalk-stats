import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Area, Tooltip } from "recharts";
import { AnalyzedMessage, ChatTimes } from "../../../@types/index.d";
import { getChatTimes, getDates, getSpeakers } from "../../../module/common/getProperties";
import { getNotDuplicatedChatDates } from "./ChatVolumeGraph";
type StackBarData = {
  name: string;
  [key: string]: number | string | undefined;
};
const PercentAreaChart = () => {
  const results = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );

  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );

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
    // 날짜만큼 객체데이터를 만들 것이니까 날짜에 대해서 for문을 돌린다.
    for (let i = 0; i < notDuplicatedChatDates.length; i++) {
      const date: any = { name: notDuplicatedChatDates[i] };
      chatSpeakers.forEach((speaker: string, speakerIndex: number) => {
        const dateIndex: number = chatDates[speakerIndex].indexOf(notDuplicatedChatDates[i]);
        if (dateIndex !== -1) {
          date[speaker[0]] = sumChatCountsDay(chatTimes[speakerIndex][dateIndex]);
        }
      });
      chatSpeakers.forEach((speaker: string, speakerIndex: number) => {
        if (!date[speaker[0]]) {
          date[speaker[0]] = 0;
        }
      });

      stackBarData.push(date);
    }
    return stackBarData;
  };

  const toPercent = (decimal: number, fixed = 0) => `${decimal * 100}%`;

  const getPercent = (value: number, total: number) => {
    const ratio = total > 0 ? value / total : 0;
    return toPercent(ratio, 2);
  };

  const renderTooltipContent = (o: any) => {
    const { payload, label } = o;
    const total = payload.reduce((result: any, entry: { value: any }) => result + entry.value, 0);
    return (
      <div className="customized-tooltip-content">
        <p className="total">{`${label} (Total: ${total})`}</p>
        <ul className="list">
          {payload.map((entry: { color: any; name: any; value: number }, index: any) => (
            <li key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const [data, setData] = useState<StackBarData[]>([]);
  let chatSpeakers = getSpeakers(results)[selectedChatRoomIndex];
  const chatDates = getDates(results)[selectedChatRoomIndex];
  const chatTimes = getChatTimes(results)[selectedChatRoomIndex];
  const colors = ["#6767fe", "#b3ff00", "#8884d8", "#82ca9d", "#ffc658"];
  const chatSpeakersColorPair = chatSpeakers.map((speaker: string, index: number) => {
    return [speaker, colors[index % colors.length]];
  });

  useEffect(() => {
    setData(createStackBarData(chatSpeakersColorPair, chatDates, chatTimes));
  }, [selectedChatRoomIndex]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        stackOffset="expand"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={toPercent} fontSize={12} />

        <Tooltip content={renderTooltipContent} />
        {chatSpeakersColorPair.map((speaker: string, index: number) => {
          return (
            <Area
              key={index}
              type="monotone"
              dataKey={speaker[0]}
              stackId="1"
              stroke="#dddddd"
              fill={speaker[1]}
            />
          );
        })}
        {/* <Area type="monotone" dataKey="a" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="b" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        <Area type="monotone" dataKey="c" stackId="1" stroke="#ffc658" fill="#ffc658" /> */}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default PercentAreaChart;
