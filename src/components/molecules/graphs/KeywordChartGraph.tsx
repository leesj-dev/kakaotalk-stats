import React, { PureComponent, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AnalyzedMessage, KeywordCounts, ValueCountPair } from "../../../@types/index.d";
import {
  colorsForGraphArray,
  customTickColor,
  setRotationColor,
} from "../../../module/common/colorsForGraphArray";
import { getKeywordCounts, getSpeakers } from "../../../module/common/getProperties";
import { getHighKeywords } from "./KeywordCloud";

const getAllKeywordData = (keywordData: ValueCountPair[]) => {
  const resultArray: ValueCountPair[] = [];

  keywordData.flat().forEach((item) => {
    const existingItem = resultArray.find((i) => i.value === item.value);
    if (existingItem) {
      existingItem.count += item.count;
    } else {
      resultArray.push({ value: item.value, count: item.count });
    }
  });
  return resultArray;
};

const KeywordChartGraph = () => {
  const results = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );
  const selectedSpeakerIndex = useSelector(
    (state: { selectedSpeakerIndexSlice: number }) => state.selectedSpeakerIndexSlice
  );
  const isDarkMode = useSelector((state: { isDarkModeSlice: boolean }) => state.isDarkModeSlice);

  const containerRef = useRef<any>(null);

  const [DISPLAY_KEYWORD_COUNT, setDISPLAY_KEYWORD_COUNT] = useState<number>(5);
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState<number>(selectedSpeakerIndex);

  const keywordCounts: KeywordCounts[][][] = getKeywordCounts(results);
  const currentKeywordCounts: KeywordCounts[][] = keywordCounts[selectedChatRoomIndex];
  const keywordData: ValueCountPair[][] = getHighKeywords(currentKeywordCounts, DISPLAY_KEYWORD_COUNT);
  const allKeywordData: ValueCountPair[] = getAllKeywordData(keywordData.flat()).sort(
    (a, b) => Number(b.count) - Number(a.count)
  );

  useEffect(() => {
    setCurrentSpeakerIndex(selectedSpeakerIndex + 1);
  }, [selectedSpeakerIndex]);

  function truncateValue(value: string) {
    if (value.length > 7) {
      return value.substring(0, 6) + "...";
    }
    return value;
  }

  useEffect(() => {
    if (containerRef.current.current.offsetLeft === 30) {
      setDISPLAY_KEYWORD_COUNT(20);
    }
  }, [containerRef]);

  return (
    <ResponsiveContainer width="100%" height={"100%"} ref={containerRef}>
      <BarChart
        layout="vertical"
        data={
          selectedSpeakerIndex === -1
            ? allKeywordData.slice(0, DISPLAY_KEYWORD_COUNT)
            : keywordData[selectedSpeakerIndex]
        }
        margin={{
          top: 0,
          right: 5,
          left: -10,
          bottom: -5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" fontSize={12} tick={customTickColor(isDarkMode)} />
        <YAxis
          type="category"
          dataKey="value"
          tickFormatter={truncateValue}
          fontSize={12}
          tick={customTickColor(isDarkMode)}
        />
        <Tooltip />
        <Bar dataKey="count" fill={setRotationColor(currentSpeakerIndex)} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default KeywordChartGraph;
