import React, { PureComponent, useEffect, useState } from "react";
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
import colorsForGraphArray from "../../../module/common/colorsForGraphArray";
import { getKeywordCounts, getSpeakers } from "../../../module/common/getProperties";
import { getHighKeywords } from "./KeywordCloud";

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
  const DISPLAY_KEYWORD_COUNT = 5;
  const speaker: string[] = getSpeakers(results)[selectedChatRoomIndex];
  const keywordCounts: KeywordCounts[][][] = getKeywordCounts(results);
  const currentKeywordCounts: KeywordCounts[][] = keywordCounts[selectedChatRoomIndex];
  const keywordData: ValueCountPair[][] = getHighKeywords(currentKeywordCounts, DISPLAY_KEYWORD_COUNT);
  const allKeywordData = keywordData.flat().sort((a, b) => Number(b.count) - Number(a.count));
  // 각각의 키워드 순위
  // const speakersTopNKeywords = useSelector(
  //   (state: { speakersTopNKeywordsSlice: ValueCountPair[][] }) => state.speakersTopNKeywordsSlice
  // );

  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState<number>(selectedSpeakerIndex);
  useEffect(() => {
    setCurrentSpeakerIndex(selectedSpeakerIndex + 1);
  }, [selectedSpeakerIndex]);

  function truncateValue(value: string) {
    if (value.length > 7) {
      return value.substring(0, 6) + "...";
    }
    return value;
  }
  return (
    <ResponsiveContainer width="100%" height={"90%"}>
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
          left: -5,
          bottom: -5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="value" tickFormatter={truncateValue} />
        <Tooltip contentStyle={{ fontSize: "2px" }} />
        <Bar
          dataKey="count"
          fill={
            currentSpeakerIndex === 0
              ? "#8884d8"
              : colorsForGraphArray[(currentSpeakerIndex - 1) % colorsForGraphArray.length]
          }
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default KeywordChartGraph;
