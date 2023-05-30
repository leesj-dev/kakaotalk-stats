import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer } from "recharts";
import { AnalyzedMessage, ChatTimes, WeekData } from "../../../@types/index.d";
import { getSpeakers } from "../../../module/common/getProperties";
import colorsForGraphArray from "../../../module/common/colorsForGraphArray";

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
          backgroundColor: `${(props: { theme: { mainWhite: string } }) => props.theme.mainWhite}`,
          border: "1px solid #999",
          margin: 0,
          padding: 10,
        }}
      >
        <p>
          {data.hour}
          <span>시</span>
        </p>
        ㅇㅎ
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

const getMostValue = (array: any) => {
  return Math.max(
    ...array.map((item: any) => {
      return Math.max(
        ...item.values.map((hourData: any) => {
          return hourData.value;
        })
      );
    })
  );
};

const ChatVolumeByHourlyGraph = () => {
  const results = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );
  const selectedSpeakerIndex = useSelector(
    (state: { selectedSpeakerIndexSlice: number }) => state.selectedSpeakerIndexSlice
  );
  const volumeHourlyBoxSize = useSelector(
    (state: { volumeHourlyBoxSizeSlice: number[] }) => state.volumeHourlyBoxSizeSlice
  );

  const [scatter, setScatter] = useState<any>([]);
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState<number>(selectedSpeakerIndex);
  const selectedChatRoomData = results[selectedChatRoomIndex];
  const speakerNames = getSpeakers(results)[selectedChatRoomIndex];
  speakerNames.unshift("전체");
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

  const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];

  const handleClickSpeaker = (index: number) => {
    setCurrentSpeakerIndex(index);
  };

  const mostValues: number[] = [];
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
    mostValues.push(getMostValue(weekData));
  });

  const totalTimezoneData = JSON.parse(JSON.stringify(graph[0]));
  for (let i = 1; i < graph.length; i++) {
    for (let j = 0; j < graph[i].length; j++) {
      for (let k = 0; k < graph[i][j].values.length; k++) {
        totalTimezoneData[j].values[k].value += graph[i][j].values[k].value;
      }
    }
  }
  mostValues.unshift(getMostValue(totalTimezoneData));
  graph.unshift(totalTimezoneData);

  useEffect(() => {
    setScatter(graph);
  }, [selectedChatRoomData]);

  useEffect(() => {
    setCurrentSpeakerIndex(selectedSpeakerIndex + 1);
  }, [selectedSpeakerIndex]);

  return (
    <>
      {/*
      시간대별 대화량 대화자
      {speakerNames.map((_: any, index: number) => {
        return (
          <span
            style={{
              padding: "0 10px",
            }}
            key={index}
            onClick={() => handleClickSpeaker(index)}
          >
            {speakerNames[index]}
          </span>
        );
      })} */}
      {scatter.length &&
        scatter[currentSpeakerIndex].map((item: any, index: number) => {
          return (
            <ResponsiveContainer key={index} width="100%" height={"13%"}>
              <ScatterChart
                margin={{
                  top: 10,
                  right: 5,
                  bottom: -12,
                  left: -38,
                }}
              >
                <XAxis
                  type="category"
                  dataKey="hour"
                  name="hour"
                  interval={0}
                  tick={{ fontSize: 10 }}
                  tickLine={{ transform: "translate(0, -6)" }}
                  fontSize={12}
                />
                <YAxis
                  type="number"
                  dataKey="index"
                  height={10}
                  width={60}
                  tick={false}
                  axisLine={false}
                  label={{
                    value: `${item.day}`,
                    position: "insideRight",
                  }}
                  fontSize={12}
                />
                <ZAxis type="number" dataKey="value" range={range} />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  wrapperStyle={{ zIndex: 100 }}
                  content={renderTooltip}
                />
                <Scatter
                  data={item.values}
                  shape={(item) => {
                    const mostValue =
                      currentSpeakerIndex === -1 ? mostValues[0] : mostValues[currentSpeakerIndex];

                    const itemWidth = volumeHourlyBoxSize[0] / 24;
                    const itemHeight = volumeHourlyBoxSize[1] / 7;
                    const opacity = item.value / mostValue;
                    return (
                      <rect
                        stroke="#ffffff"
                        strokeWidth={2}
                        fill={
                          currentSpeakerIndex === 0
                            ? "#8884d8"
                            : colorsForGraphArray[(currentSpeakerIndex - 1) % colorsForGraphArray.length]
                        }
                        x={item.cx - itemWidth / 2}
                        y={item.cy - itemHeight / 2}
                        width={itemWidth}
                        height={itemHeight}
                        opacity={opacity}
                      />
                    );
                  }}
                  fill={
                    currentSpeakerIndex === 0
                      ? "#8884d8"
                      : colorsForGraphArray[(currentSpeakerIndex - 1) % colorsForGraphArray.length]
                  }
                />
              </ScatterChart>
            </ResponsiveContainer>
          );
        })}
    </>
  );
};

export default ChatVolumeByHourlyGraph;
