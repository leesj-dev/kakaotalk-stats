import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { AnalyzedMessage } from "../../../@types/index.d";
import { colorsForGraphArray } from "../../../module/common/colorsForGraphArray";
import { setSelectedSpeakerIndex } from "../../../store/reducer/dashboard/selectedSpeakerIndexSlice";
import { reduceAPlusB } from "../../../module/common/reduceAPlusB";
import styled from "styled-components";
import { graphTooltipStyle } from "../../../style/specifiedCss/graphTooltip";

const ChatRatioWithArrowGraphBox = styled.div<{ justifyContent?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 1200px) {
    margin-bottom: 5px;
    align-items: end;
    justify-content: end;
  }
`;

const RADIAN = Math.PI / 180;

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
    <circle key="circle" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path
      key="path"
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      stroke="#none"
      fill={color}
    />,
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

interface ChatRatioWithArrowGraphProps {
  justifyContent?: string;
}

let selectedChatRoomData;
let speakerTotalChatCounts: Record<string, number> = {};
let totalChatCount: any;

const ChatRatioWithArrowGraph = ({ justifyContent }: ChatRatioWithArrowGraphProps) => {
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

  const [data, setData] = useState<any[]>([]);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  let scale = 1;
  if (screenWidth < 480) {
    scale = 0.8;
  }

  const cx = 50 * scale,
    cy = 50 * scale,
    iR = 25 * scale,
    oR = 50 * scale;

  useEffect(() => {
    setData([]);
  }, [selectedChatRoomIndex]);

  if (!data.length) {
    selectedChatRoomData = results[selectedChatRoomIndex];
    Object.values(selectedChatRoomData).forEach((chatroom) => {
      Object.values(chatroom).forEach((chat: { chatTimes: any; speaker: string }) => {
        const speaker = chat.speaker;
        if (!speakerTotalChatCounts[speaker]) {
          speakerTotalChatCounts[speaker] = 0;
        }
        const chatTimes = chat.chatTimes;
        const chatCounts = chatTimes ? Object.values(chatTimes) : [];
        const totalChatCount = reduceAPlusB(chatCounts);
        speakerTotalChatCounts[speaker] += Number(totalChatCount);
      });
    });
    totalChatCount = reduceAPlusB(Object.values(speakerTotalChatCounts));
    const result = Object.entries(speakerTotalChatCounts).map(([name, value], index) => ({
      name,
      value: Number(((value / totalChatCount) * 100).toFixed(0)),
      color: colorsForGraphArray[index % colorsForGraphArray.length],
    }));
    setData(result);
  }

  let angle = data.length && getValueForAngle(data, selectedSpeakerIndex);

  const handleClickSpeakerCell = (index: number) => {
    dispatch(setSelectedSpeakerIndex(index));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ChatRatioWithArrowGraphBox justifyContent={justifyContent}>
      <PieChart width={110 * scale} height={60 * scale}>
        <Tooltip contentStyle={graphTooltipStyle} />
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
          animationDuration={300}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              onClick={() => handleClickSpeakerCell(index)}
              stroke={colorsForGraphArray[index % colorsForGraphArray.length]}
              fill={colorsForGraphArray[index % colorsForGraphArray.length]}
              strokeWidth={selectedSpeakerIndex === -1 ? 1 : 0}
              fillOpacity={selectedSpeakerIndex === -1 ? 0.85 : selectedSpeakerIndex === index ? 1 : 0.4}
              style={{ cursor: "pointer" }}
            />
          ))}
        </Pie>

        {needle(angle, data, cx, cy, iR, oR, "#FF414D")}
      </PieChart>
    </ChatRatioWithArrowGraphBox>
  );
};

export default ChatRatioWithArrowGraph;
