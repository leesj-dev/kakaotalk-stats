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
      }
      const chatTimes = chat.chatTimes;
      if (chatTimes) {
        Object.keys(chatTimes).forEach((time) => {
          const hour = time.split(":")[0];
          speakerTotalChatTimes[speaker][date][hour] =
            (speakerTotalChatTimes[speaker][date][hour] || 0) + chatTimes[time];
          console.log(speakerTotalChatTimes, "데이터 구조데이터구조");
        });
      }
    });
  });

  const data01 = [
    { hour: "12a", index: 1, value: 170 },
    { hour: "1a", index: 1, value: 180 },
    { hour: "2a", index: 1, value: 150 },
    { hour: "3a", index: 1, value: 120 },
    { hour: "4a", index: 1, value: 200 },
    { hour: "5a", index: 1, value: 300 },
    { hour: "6a", index: 1, value: 400 },
    { hour: "7a", index: 1, value: 200 },
    { hour: "8a", index: 1, value: 100 },
    { hour: "9a", index: 1, value: 150 },
    { hour: "10a", index: 1, value: 160 },
    { hour: "11a", index: 1, value: 170 },
    { hour: "12a", index: 1, value: 180 },
    { hour: "1p", index: 1, value: 144 },
    { hour: "2p", index: 1, value: 166 },
    { hour: "3p", index: 1, value: 145 },
    { hour: "4p", index: 1, value: 150 },
    { hour: "5p", index: 1, value: 170 },
    { hour: "6p", index: 1, value: 180 },
    { hour: "7p", index: 1, value: 165 },
    { hour: "8p", index: 1, value: 130 },
    { hour: "9p", index: 1, value: 140 },
    { hour: "10p", index: 1, value: 170 },
    { hour: "11p", index: 1, value: 180 },
  ];

  const data02 = [
    { hour: "12a", index: 1, value: 160 },
    { hour: "1a", index: 1, value: 180 },
    { hour: "2a", index: 1, value: 150 },
    { hour: "3a", index: 1, value: 120 },
    { hour: "4a", index: 1, value: 200 },
    { hour: "5a", index: 1, value: 300 },
    { hour: "6a", index: 1, value: 100 },
    { hour: "7a", index: 1, value: 200 },
    { hour: "8a", index: 1, value: 100 },
    { hour: "9a", index: 1, value: 150 },
    { hour: "10a", index: 1, value: 160 },
    { hour: "11a", index: 1, value: 160 },
    { hour: "12a", index: 1, value: 180 },
    { hour: "1p", index: 1, value: 144 },
    { hour: "2p", index: 1, value: 166 },
    { hour: "3p", index: 1, value: 145 },
    { hour: "4p", index: 1, value: 150 },
    { hour: "5p", index: 1, value: 160 },
    { hour: "6p", index: 1, value: 180 },
    { hour: "7p", index: 1, value: 165 },
    { hour: "8p", index: 1, value: 130 },
    { hour: "9p", index: 1, value: 140 },
    { hour: "10p", index: 1, value: 160 },
    { hour: "11p", index: 1, value: 180 },
  ];
  //   시간 별 대화 수

  const parseDomain = () => [
    0,
    Math.max(
      Math.max.apply(
        null,
        data01.map((entry) => entry.value)
      ),
      Math.max.apply(
        null,
        data02.map((entry) => entry.value)
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
            name="sunday"
            height={10}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{ value: "Sunday", position: "insideRight" }}
          />
          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            wrapperStyle={{ zIndex: 100 }}
            content={renderTooltip}
          />
          <Scatter data={data01} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          width={800}
          height={60}
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
            label={{ value: "Monday", position: "insideRight" }}
          />
          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            wrapperStyle={{ zIndex: 100 }}
            content={renderTooltip}
          />
          <Scatter data={data02} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          width={800}
          height={60}
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
            label={{ value: "Tuesday", position: "insideRight" }}
          />
          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            wrapperStyle={{ zIndex: 100 }}
            content={renderTooltip}
          />
          <Scatter data={data01} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          width={800}
          height={60}
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
            label={{ value: "Wednesday", position: "insideRight" }}
          />
          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            wrapperStyle={{ zIndex: 100 }}
            content={renderTooltip}
          />
          <Scatter data={data02} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          width={800}
          height={60}
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
            label={{ value: "Thursday", position: "insideRight" }}
          />
          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            wrapperStyle={{ zIndex: 100 }}
            content={renderTooltip}
          />
          <Scatter data={data01} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          width={800}
          height={60}
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
            label={{ value: "Friday", position: "insideRight" }}
          />
          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            wrapperStyle={{ zIndex: 100 }}
            content={renderTooltip}
          />
          <Scatter data={data02} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          width={800}
          height={60}
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
            label={{ value: "Saturday", position: "insideRight" }}
          />
          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            wrapperStyle={{ zIndex: 100 }}
            content={renderTooltip}
          />
          <Scatter data={data01} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Timezone;
