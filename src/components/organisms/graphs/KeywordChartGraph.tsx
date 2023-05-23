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

  const speaker: string[] = getSpeakers(results)[selectedChatRoomIndex];
  const keywordCounts: KeywordCounts[][][] = getKeywordCounts(results);
  const currentKeywordCounts: KeywordCounts[][] = keywordCounts[selectedChatRoomIndex];
  const keywordData: ValueCountPair[][] = getHighKeywords(currentKeywordCounts, speaker.length);
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
    <ResponsiveContainer width="100%" height={300}>
      <BarChart layout="vertical" data={keywordData[selectedSpeakerIndex]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="value" tickFormatter={truncateValue} />
        <Tooltip contentStyle={{ fontSize: "2px" }} />
        <Legend />
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
