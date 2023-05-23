import React, { PureComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PieChart, Pie, Cell, Line, Tooltip } from "recharts";
import { AnalyzedMessage } from "../../../@types/index.d";
import colorsForGraphArray from "../../../module/common/colorsForGraphArray";
import { setSelectedSpeakerIndex } from "../../../store/reducer/selectedSpeakerIndexSlice";
import { reduceAPlusB } from "../../../module/common/reduceAPlusB";

const RADIAN = Math.PI / 180;

const cx = 48;
const cy = 60;
const iR = 25;
const oR = 50;

const needle = (
  value: number,
  data: any[],
  cx: number,
  cy: number,
  iR: number,
  oR: number,
  color: string | undefined
) => {
  let total = 0;
  data.forEach((v) => {
    total += v.value;
  });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 3;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
  ];
};

const getValueForAngle = (data: any, selectedSpeakerIndex: number) => {
  if (selectedSpeakerIndex !== -1) {
    const valueForAngle = data.map((item: any) => item.value);
    const previousSpeakerValues = reduceAPlusB(valueForAngle.slice(0, selectedSpeakerIndex));
    const currentSpeakerValue = data[selectedSpeakerIndex].value / 2;
    return previousSpeakerValues + currentSpeakerValue;
  }
  return -1;
};

const PieChartWithNeedle = () => {
  const dispatch = useDispatch();

  const results = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );
  const selectedSpeakerIndex = useSelector(
    (state: { selectedSpeakerIndexSlice: number }) => state.selectedSpeakerIndexSlice
  );

  const selectedChatRoomData = results[selectedChatRoomIndex];
  const speakerTotalChatCounts: Record<string, number> = {};
  Object.values(selectedChatRoomData).forEach((chatroom) => {
    Object.values(chatroom).forEach((chat: { chatTimes: any; speaker: string }) => {
      const speaker = chat.speaker;
      if (!speakerTotalChatCounts[speaker]) {
        speakerTotalChatCounts[speaker] = 0;
      }
      const chatTimes = chat.chatTimes;
      const chatCounts = chatTimes ? Object.values(chatTimes) : [];
      const totalChatCount = chatCounts.reduce((acc, count) => Number(acc) + Number(count), 0);
      speakerTotalChatCounts[speaker] += Number(totalChatCount);
    });
  });
  const totalChatCount = Object.values(speakerTotalChatCounts).reduce((a: number, b: number) => a + b);
  const data = Object.entries(speakerTotalChatCounts).map(([name, value], index) => ({
    name,
    value: Number(((value / totalChatCount) * 100).toFixed(0)),
    color: colorsForGraphArray[index % colorsForGraphArray.length],
  }));

  let angle = getValueForAngle(data, selectedSpeakerIndex);

  const handleClickSpeakerCell = (index: number) => {
    dispatch(setSelectedSpeakerIndex(index));
  };

  return (
    <div>
      <PieChart
        width={110}
        height={90}
        style={{
          // border: "1px solid #8884d8",
          marginLeft: "30px",
        }}
      >
        <Tooltip />
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              onClick={() => handleClickSpeakerCell(index)}
              stroke={colorsForGraphArray[index % colorsForGraphArray.length]}
              fill={colorsForGraphArray[index % colorsForGraphArray.length]}
              fillOpacity={selectedSpeakerIndex === index ? 1 : 0.7}
              style={{ cursor: "pointer" }}
            />
          ))}
        </Pie>

        {needle(angle, data, cx, cy, iR, oR, "#FF414D")}
      </PieChart>
    </div>
  );
};

export default PieChartWithNeedle;
