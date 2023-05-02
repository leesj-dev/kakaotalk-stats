import React, { PureComponent } from "react";
import { useSelector } from "react-redux";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  AnalyzedMessage,
  ChatTimes,
  KeywordCounts,
  ReplyTime,
} from "../../../../@types/index.d";

const Timezone = () => {
  // [
  //     [
  //       [
  //         {speaker: '프밍고수영한씌',
  //          date: '221231',
  //          chatTimes:{20:21: 3, 20:22: 3, 20:27: 1, 20:28: 1, 22:55: 4}
  //          },
  //         {speaker: '프밍고수영한씌',
  //          date: '230101',
  //          chatTimes:{20:21: 3, 20:22: 3, 20:27: 1, 20:28: 1, 22:55: 4}
  //          }
  //       ],
  //       [
  //         {speaker: '쥬히',
  //         date: '221231',
  //         chatTimes:{20:21: 1, 20:23: 5, 21:00: 1}
  //         }
  //       ]
  //      ]
  //   ]
  const results = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) =>
      state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );

  const selectedChatRoomData = results[selectedChatRoomIndex];

  const speakerTotalChatTimes: Record<
    string,
    Record<string, Record<string, number>>
  > = {};
  function getDayIndex(date: any) {
    const dayOfWeek = new Date(
      date.slice(0, 2),
      date.slice(2, 4) - 1,
      date.slice(4, 6)
    ).getDay();

    return dayOfWeek;
  }
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

  console.log(speakerTotalChatTimes);

  //   시간 별 대화 수

  const dayData = [
    {
      day: "Sunday",
      dayIndex: 0,
      values: [
        { hour: "00", value: 160, index: 1 },
        { hour: "01", value: 170, index: 1 },
        { hour: "02", value: 170, index: 1 },
        { hour: "03", value: 170, index: 1 },
      ],
    },
    {
      day: "Monday",
      dayIndex: 1,
      values: [
        { hour: "00", value: 160, index: 1 },
        { hour: "01", value: 170, index: 1 },
        { hour: "02", value: 170, index: 1 },
        { hour: "03", value: 170, index: 1 },
        { hour: "04", value: 170, index: 1 },
      ],
    },
    {
      day: "Tuesday",
      dayIndex: 2,
      values: [
        { hour: "00", value: 160, index: 1 },
        { hour: "01", value: 170, index: 1 },
        { hour: "04", value: 170, index: 1 },
        { hour: "05", value: 170, index: 1 },
        { hour: "06", value: 170, index: 1 },
      ],
    },
    {
      day: "Wednesday",
      dayIndex: 3,
      values: [
        { hour: "00", value: 160, index: 1 },
        { hour: "01", value: 170, index: 1 },
        { hour: "12", value: 170, index: 1 },
        { hour: "13", value: 170, index: 1 },
        { hour: "16", value: 170, index: 1 },
      ],
    },
    {
      day: "Thursday",
      dayIndex: 3,
      values: [
        { hour: "00", value: 160, index: 1 },
        { hour: "01", value: 170, index: 1 },
        { hour: "12", value: 170, index: 1 },
        { hour: "13", value: 170, index: 1 },
        { hour: "16", value: 170, index: 1 },
      ],
    },
    {
      day: "Friday",
      dayIndex: 3,
      values: [
        { hour: "00", value: 160, index: 1 },
        { hour: "01", value: 170, index: 1 },
        { hour: "12", value: 170, index: 1 },
        { hour: "13", value: 170, index: 1 },
        { hour: "16", value: 170, index: 1 },
      ],
    },
    {
      day: "Saturday",
      dayIndex: 3,
      values: [
        { hour: "00", value: 160, index: 1 },
        { hour: "01", value: 170, index: 1 },
        { hour: "12", value: 170, index: 1 },
        { hour: "13", value: 170, index: 1 },
        { hour: "16", value: 170, index: 1 },
      ],
    },
    {
      day: "Sunday",
      dayIndex: 3,
      values: [
        { hour: "00", value: 160, index: 1 },
        { hour: "01", value: 170, index: 1 },
        { hour: "02", value: 170, index: 1 },
        { hour: "03", value: 170, index: 1 },
        { hour: "04", value: 170, index: 1 },
        { hour: "05", value: 170, index: 1 },
        { hour: "06", value: 170, index: 1 },
        { hour: "07", value: 170, index: 1 },
        { hour: "08", value: 170, index: 1 },
        { hour: "09", value: 170, index: 1 },
        { hour: "10", value: 170, index: 1 },
        { hour: "11", value: 170, index: 1 },
        { hour: "12", value: 170, index: 1 },
        { hour: "13", value: 170, index: 1 },
        { hour: "14", value: 170, index: 1 },
        { hour: "15", value: 170, index: 1 },
        { hour: "16", value: 170, index: 1 },
        { hour: "17", value: 170, index: 1 },
        { hour: "18", value: 170, index: 1 },
        { hour: "19", value: 170, index: 1 },
        { hour: "20", value: 170, index: 1 },
        { hour: "21", value: 170, index: 1 },
        { hour: "22", value: 170, index: 1 },
        { hour: "23", value: 170, index: 1 },
      ],
    },
  ];

  const parseDomain = () => [
    0,
    Math.max(
      ...dayData.map((entry) =>
        Math.max(...entry.values.map((item) => item.value))
      )
    ),
  ];
  const renderTooltip = (props: any) => {
    const { active, payload } = props;

    if (active && payload?.length) {
      const data = payload[0]?.payload;

      return (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #999",
            margin: 0,
            padding: 10,
          }}
        >
          <p>{data.hour}</p>
          <p>
            <span>value: </span>
            {data.value}
          </p>
        </div>
      );
    }

    return null;
  };
  const domain = parseDomain();
  const range = [16, 225];

  return (
    <div style={{ width: "100%" }}>
      {/* 0 */}
      {dayData.map((dayData, index) => (
        <ResponsiveContainer width="100%" height={60}>
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
              interval={0}
              tick={{ fontSize: 0 }}
              tickLine={{ transform: "translate(0, -6)" }}
            />
            <YAxis
              type="number"
              dataKey="index"
              height={10}
              width={80}
              tick={false}
              tickLine={false}
              axisLine={false}
              label={{
                value: `${dayData.day}`,
                position: "insideRight",
              }}
            />
            <ZAxis
              type="number"
              dataKey="value"
              domain={domain}
              range={range}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              wrapperStyle={{ zIndex: 100 }}
              content={renderTooltip}
            />
            <Scatter data={dayData.values} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      ))}
    </div>
  );
};

export default Timezone;
