import React, { PureComponent, useState } from "react";
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
import { getKeywordCounts } from "../../../module/common/getProperties";

const KeyWordDashBoard = () => {
  const getHighKeywords = (
    currentKeywordCounts: KeywordCounts[][],
    displayKeywordCount: number,
    keywordToFilter: string[] = []
  ) => {
    const highKeywords: ValueCountPair[][] = [];
    for (const keywordsArray of currentKeywordCounts) {
      highKeywords.push(getSpeakersTopNKeywords(keywordsArray, displayKeywordCount));
    }

    const filteredHighKeyword = highKeywords.map((keywordArray: ValueCountPair[]) =>
      keywordArray.filter(
        (keyword: ValueCountPair) => !keywordToFilter.some((el: any) => keyword.value.includes(el))
      )
    );

    return filteredHighKeyword;
  };
  const getSpeakersTopNKeywords = (keywordsArray: KeywordCounts[], displayKeywordCount: number) => {
    const allKeywords: KeywordCounts = {};
    keywordsArray.forEach((keywords: KeywordCounts) => {
      for (const key in keywords) {
        allKeywords[key] ? (allKeywords[key] += keywords[key]) : (allKeywords[key] = keywords[key]);
      }
    });

    const topNKeywords: ValueCountPair[] = getAllTopNKeywords(allKeywords, displayKeywordCount);
    return topNKeywords;
  };
  const getAllTopNKeywords = (allKeywords: KeywordCounts, n: number) => {
    const keywordsEntries: ValueCountPair[] = Object.entries(allKeywords).map(([value, count]) => ({
      value,
      count,
    }));
    const sortedKeywordsEntries: ValueCountPair[] = keywordsEntries.sort(
      (a: ValueCountPair, b: ValueCountPair) => b.count - a.count
    );
    const topNKeywords: ValueCountPair[] = sortedKeywordsEntries.slice(0, n + 1);
    return topNKeywords;
  };

  const [displayKeywordCount, setDisplayKeywordCount] = useState<number>(4);
  const results = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );

  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );
  const keywordCounts: KeywordCounts[][][] = getKeywordCounts(results);
  const currentKeywordCounts: KeywordCounts[][] = keywordCounts[selectedChatRoomIndex];
  const keywordData: ValueCountPair[][] = getHighKeywords(currentKeywordCounts, displayKeywordCount);
  // 각각의 키워드 순위
  // console.log(keywordData);
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
      <BarChart layout="vertical" data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default KeyWordDashBoard;
