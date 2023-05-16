import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer } from "recharts";
import { AnalyzedMessage, ChatTimes, WeekData } from "../../../@types/index.d";
import { getSpeakers } from "../../../module/common/getProperties";

const getDayIndex = (date: string) => {
  const parsedDate = parseInt(date);
  const dayOfWeek: number = new Date(
    2000 + Math.floor(parsedDate / 10000),
    (Math.floor(parsedDate / 100) % 100) - 1,
    parsedDate % 100
  ).getDay();
  return dayOfWeek;
};

const renderTooltip = (props: any) => {
  const { active, payload } = props;

  if (active && payload?.length) {
    const data = payload[0]?.payload;

    return (
      <div
        style={{
          backgroundColor: "${(props) => props.theme.mainBlue};",
          border: "1px solid #999",
          margin: 0,
          padding: 10,
        }}
      >
        <p>
          {data.hour}
          <span>시</span>
        </p>
        <p>
          <span>대화량: </span>
          {data.value}
        </p>
      </div>
    );
  }

  return null;
};
const range = [16, 225];

const TimezoneGraph = () => {
  const results = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );

  const [scatter, setScatter] = useState<any>([]);
  const [selectedSpeakerIndex, setSelectedSpeakerIndex] = useState<number>(0);

  const selectedChatRoomData = results[selectedChatRoomIndex];
  const speakerNames = getSpeakers(results)[selectedChatRoomIndex];

  const speakerTotalChatTimes: Record<string, Record<string, Record<string, number>>> = {};

  Object.values(selectedChatRoomData).forEach((chatroom) => {
    Object.values(chatroom).forEach((chat) => {
      const speaker = chat.speaker;
      const date = getDayIndex(chat.date);
      if (!speakerTotalChatTimes[speaker]) {
        speakerTotalChatTimes[speaker] = {};
      }
      if (!speakerTotalChatTimes[speaker][date]) {
        speakerTotalChatTimes[speaker][date] = {};
        for (let i = 0; i < 24; i++) {
          speakerTotalChatTimes[speaker][date][i.toString()] = 0;
        }
      }
      const chatTimes = chat.chatTimes;
      if (chatTimes) {
        Object.keys(chatTimes).forEach((time) => {
          const hour = parseInt(time.split(":")[0]);
          speakerTotalChatTimes[speaker][date][hour] += chatTimes[time];
        });
      }
    });
  });

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "WednesDay", "Thursday", "Friday", "Saturday"];

  const handleClickSpeaker = (index: number) => {
    setSelectedSpeakerIndex(index);
  };

  useEffect(() => {
    let graph: any[] = [];
    Object.entries(speakerTotalChatTimes).forEach((speaker: any) => {
      const weekData: WeekData[] = [];

      const timeDataOfWeek: ChatTimes = speaker[1];
      const timeTable: any[] = Object.values(timeDataOfWeek);

      daysOfWeek.forEach((day: string, index: number) => {
        weekData.push({
          day: day,
          values: [],
        });
        const timeTableDay = timeTable[index];
        for (const timeNumber in timeTableDay) {
          weekData.at(-1)?.values.push({
            hour: timeNumber,
            value: timeTableDay[timeNumber],
            index: 1,
          });
        }
      });
      graph.push(weekData);
    });
    setScatter(graph);
  }, [selectedChatRoomData]);

  return (
    <>
      시간대별 대화량
      {speakerNames.map((_: any, index: number) => {
        return (
          <div key={index} onClick={() => handleClickSpeaker(index)}>
            {speakerNames[index]}
          </div>
        );
      })}
      {scatter.length &&
        scatter[selectedSpeakerIndex].map((item: any, index: number) => {
          return (
            <ResponsiveContainer key={index} width="100%" height={60}>
              <ScatterChart
                margin={{
                  top: 10,
                  right: 0,
                  bottom: 0,
                  left: 0,
                }}
              >
                <XAxis
                  type="category"
                  dataKey="hour"
                  name="hour"
                  interval={0}
                  tick={{ fontSize: 15 }}
                  tickLine={{ transform: "translate(0, -6)" }}
                />
                <YAxis
                  type="number"
                  dataKey="index"
                  height={10}
                  width={80}
                  tick={false}
                  axisLine={false}
                  label={{
                    value: `${item.day}`,
                    position: "insideRight",
                  }}
                />
                <ZAxis type="number" dataKey="value" range={range} />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  wrapperStyle={{ zIndex: 100 }}
                  content={renderTooltip}
                />
                <Scatter data={item.values} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          );
        })}
    </>
  );
};

export default TimezoneGraph;
