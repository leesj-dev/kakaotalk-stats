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
import { getKeywordCounts, getSpeakers } from "../../../module/common/getProperties";
import { getHighKeywords } from "./KeywordCloud";

const KeywordChartGraph = () => {
  const results = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );

  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );
  const speaker: string[] = getSpeakers(results)[selectedChatRoomIndex];
  const keywordCounts: KeywordCounts[][][] = getKeywordCounts(results);
  const currentKeywordCounts: KeywordCounts[][] = keywordCounts[selectedChatRoomIndex];

  const keywordData: ValueCountPair[][] = getHighKeywords(currentKeywordCounts, speaker.length);
  // 각각의 키워드 순위
  // const speakersTopNKeywords = useSelector(
  //   (state: { speakersTopNKeywordsSlice: ValueCountPair[][] }) => state.speakersTopNKeywordsSlice
  // );
  console.log(keywordData, "currentKeywordCounts");

  const data = [
    {
      name: "Page A",
      uv: 4000,
    },
    {
      name: "Page B",
      uv: 3000,
    },
    {
      name: "Page C",
      uv: 2000,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart layout="vertical" data={keywordData[0]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="value" />
        <Tooltip contentStyle={{ fontSize: "2px" }} />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default KeywordChartGraph;
