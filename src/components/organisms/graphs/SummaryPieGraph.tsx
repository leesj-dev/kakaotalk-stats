import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  getChatTimes,
  getDates,
  getReplyTimes,
  getSpeakers,
} from "../../../module/common/getProperties";
import { setSelectedChatRoomIndex } from "../../../store/reducer/selectedRoomIndexSlice";
import {
  AnalyzedMessage,
  ChatTimes,
  NameValuePair,
  ReplyTime,
  StringNumberTuple,
  selectedChatRoomData,
} from "../../../@types/index.d";
import GraphInformation from "../../molecules/GraphInformation";
import styled from "styled-components";
import { setAverageReplyTime } from "../../../store/reducer/averageReplyTimeSlice";
import { reduceAPlusB } from "../../../module/common/reduceAPlusB";
import { getNotDuplicatedChatDates } from "./ChatVolumeGraph";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export const getTotalChatCounts = (chatTimes: ChatTimes[][][]) => {
  let totalChatCounts: number[] = [];
  for (const chatroom of chatTimes) {
    const times: ChatTimes[] = chatroom.flat();
    const timeSum: number[] = times.map((time: ChatTimes) => reduceAPlusB(Object.values(time)));
    totalChatCounts.push(reduceAPlusB(timeSum));
  }
  return totalChatCounts;
};

const getTwoLettersFromSpeakers = (speakers: string[][]) => {
  let chatRoomNames: string[] = [];
  for (const chatroom of speakers) {
    chatRoomNames.push(chatroom.map((speakerName: string) => speakerName.slice(0, 2)).join());
  }
  return chatRoomNames;
};

const calculateMostChattedTime = (
  chatTimes: ChatTimes[],
  mostChattedTimeArray: ChatTimes[],
  chatroomIndex: number
) => {
  chatTimes.forEach((chatTime: ChatTimes) => {
    const chatTimeEntry = Object.entries(chatTime);
    for (let i = 0; i < chatTimeEntry.length; i++) {
      const hour: string = chatTimeEntry[i][0].slice(0, 2);
      const value: number = chatTimeEntry[i][1];
      const currentChatroom: ChatTimes = mostChattedTimeArray[chatroomIndex];
      currentChatroom[hour] ? (currentChatroom[hour] += value) : (currentChatroom[hour] = value);
    }
  });
};

export const getMostChattedTimes = (chatTimes: ChatTimes[][][]) => {
  const mostChattedTimeArray: ChatTimes[] = [];
  let chatroomIndex: number = 0;
  for (const chatroom of chatTimes) {
    mostChattedTimeArray.push({});
    const chatTimes: ChatTimes[] = chatroom.flat();
    calculateMostChattedTime(chatTimes, mostChattedTimeArray, chatroomIndex);
    chatroomIndex++;
  }
  const mostChattedTimes: StringNumberTuple[][] = mostChattedTimeArray.map((chatTimes: ChatTimes) => {
    return Object.entries(chatTimes).sort((a: StringNumberTuple, b: StringNumberTuple) => b[1] - a[1]);
  });
  return mostChattedTimes;
};

const getAverageReplyTime = (replyTimes: ReplyTime[][][]) => {
  const averageReplyTimeArray: number[][] = [];
  for (const chatroom of replyTimes) {
    const averageReplyTime: number[] = chatroom.map((times: ReplyTime[]) => {
      const averageReplyTime: number = times.reduce(
        (acc: number, cur: ReplyTime) => acc + (cur.difference / cur.count || 0),
        times[0].difference / times[0].count || 0
      );
      return Math.floor(averageReplyTime / times.length);
    });
    averageReplyTimeArray.push(averageReplyTime);
  }
  return averageReplyTimeArray;
};

const getDayDifference = (date1: Date, date2: Date) => {
  const oneDay = 24 * 60 * 60 * 1000; // 1일은 24시간, 60분, 60초, 1000밀리초로 구성됩니다.
  const diffInMilliseconds = Math.abs(Number(date1) - Number(date2)); // 두 날짜 사이의 밀리초 차이를 계산합니다.
  const diffInDays = Math.round(diffInMilliseconds / oneDay); // 밀리초를 일수로 변환합니다.
  return diffInDays;
};

const getDateMilliseconds = (date: string) => {
  const dateNumber = Number(date);
  const year = 20 + dateNumber / 10000;
  const month = (dateNumber % 10000) / 100 - 1;
  const day = dateNumber % 100;
  return new Date(year, month, day);
};

const SummaryPieGraph = () => {
  const dispatch = useDispatch();
  const analyzedMessages = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );
  const nfKeywordCounts = useSelector(
    (state: { nfKeywordCountsSlice: number[][] }) => state.nfKeywordCountsSlice
  );
  const [selectedChatRoomData, setSelectedChatRoomData] = useState<selectedChatRoomData | null>(null);

  const speakers: string[][] = getSpeakers(analyzedMessages);
  const chatRoomNames: string[] = getTwoLettersFromSpeakers(speakers);
  const chatTimes: ChatTimes[][][] = getChatTimes(analyzedMessages);
  const totalChatCounts: number[] = getTotalChatCounts(chatTimes);
  const pieGraphData: NameValuePair[] = chatRoomNames.map((name, index) => {
    return {
      name: name,
      value: totalChatCounts[index],
    };
  });
  const dates: string[][] = getDates(analyzedMessages);
  const mostChattedTimes: StringNumberTuple[][] = getMostChattedTimes(chatTimes);
  const replyTimes: ReplyTime[][][] = getReplyTimes(analyzedMessages);
  const averageReplyTime: number[][] = getAverageReplyTime(replyTimes);

  const handleClickChatRoom = (index: number) => {
    dispatch(setSelectedChatRoomIndex(index));
  };

  useEffect(() => {
    setSelectedChatRoomData({
      totalChatCount: totalChatCounts[selectedChatRoomIndex],
      speakerCount: speakers[selectedChatRoomIndex].length,
      speakers: speakers[selectedChatRoomIndex],
      mostChattedTimes: mostChattedTimes[selectedChatRoomIndex],
      averageReplyTime: averageReplyTime[selectedChatRoomIndex],
    });
    dispatch(setAverageReplyTime(averageReplyTime[selectedChatRoomIndex]));
  }, [selectedChatRoomIndex]);

  const nfKeywordCountArray = nfKeywordCounts.map((nfCountArray: number[]) => {
    return nfCountArray.reduce((a: number, b: number) => a + b, 0);
  });

  const getRadarData = () => {
    const radarData: any[] = [];

    for (let i = 0; i < totalChatCounts.length; i++) {
      const radarDatum: any = {};
      const notDuplicatedChatDates: string[] = getNotDuplicatedChatDates(dates[i]);
      const date1 = getDateMilliseconds(notDuplicatedChatDates[notDuplicatedChatDates.length - 1]);
      const date2 = getDateMilliseconds(notDuplicatedChatDates[0]);
      radarDatum["totalMessageCount"] = totalChatCounts[i];
      radarDatum["averageReplySpeed"] =
        averageReplyTime[i].reduce((a: number, b: number) => a + b, 0) / speakers[i].length;
      radarDatum["peopleCount"] = speakers[i].length;
      radarDatum["chatPeriod"] = getDayDifference(date1, date2);
      radarDatum["nfKeywordCountArray"] = Math.floor(
        (nfKeywordCountArray[i] / totalChatCounts[i]) * 1000
      );
      radarData.push(radarDatum);
    }
    return radarData;
  };

  const getRadarRankData = (radarData: number[][]) => {
    const radarValues = radarData.map((el) => Object.values(el));

    const subject: number[][] = Array.from({ length: 5 }, () => []);

    for (let j = 0; j < radarValues[0].length; j++) {
      for (let i = 0; i < radarValues.length; i++) {
        subject[j].push(radarValues[i][j]);
      }
    }

    const ranksData = [];
    for (let i = 0; i < subject.length; i++) {
      const sortedNumbers = subject[i]
        .map((value, index) => ({ value, index })) // 원래 숫자와 인덱스를 포함한 객체로 변환
        .sort((a, b) => b.value - a.value); // 숫자를 기준으로 내림차순 정렬

      let currentRank = subject[0].length + 1;
      let previousValue: number | null = null;
      const ranks: any[] = [];

      sortedNumbers.forEach((item, index) => {
        if (item.value !== previousValue) {
          currentRank -= 1;
        }
        ranks[item.index] = currentRank;
        previousValue = item.value;
      });
      ranksData.push(ranks);
    }
    const radarSubjects = [
      "totalMessageCount",
      "averageReplySpeed",
      "peopleCount",
      "chatPeriod",
      "nfKeywordCountArray",
    ];

    const resultData = ranksData.map((ranks, index) => {
      const rankObject = ranks.reduce((obj, rank, chatRoomIndex) => {
        obj[chatRoomIndex] = rank;
        return obj;
      }, {});

      return {
        subject: radarSubjects[index],
        ...rankObject,
        fullMark: ranks.length,
      };
    });

    return resultData;
  };

  const radarRankData = getRadarRankData(getRadarData());

  const colors = [
    "#FF6384", // 핑크
    "#36A2EB", // 파랑
    "#FFCE56", // 노랑
    "#4BC0C0", // 청록
    "#FF9F40", // 오렌지
    "#8A2BE2", // 보라
    "#3CB371", // 민트
    "#FFD700", // 금색
    "#BA55D3", // 보라핑크
    "#00CED1", // 옥색
  ];

  return (
    <>
      <ResponsiveContainer width="100%" height={"80%"}>
        <PieChart width={400} height={400}>
          <Pie
            data={pieGraphData}
            cx={200}
            cy={200}
            innerRadius={70}
            outerRadius={100}
            dataKey="value"
            labelLine
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {pieGraphData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                onClick={() => handleClickChatRoom(index)}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="horizontal" />
        </PieChart>
      </ResponsiveContainer>

      {selectedChatRoomData && (
        <div>
          <GraphInformation unit={"총 대화 수"} value={selectedChatRoomData.totalChatCount.toString()} />
          <GraphInformation unit={"대화자"} value={selectedChatRoomData.speakers.join(",")} />

          <GraphInformation unit={"대화자 수"} value={selectedChatRoomData.speakerCount.toString()} />
          <GraphInformation
            unit={"가장 많은 대화 시간대"}
            value={`${selectedChatRoomData.mostChattedTimes[0][0]}시 대화수: 
            ${selectedChatRoomData.mostChattedTimes[0][1]}개`}
          />
          {selectedChatRoomData.speakers.map((speaker: string, index: number) => {
            return (
              <GraphInformation
                key={index}
                unit={speaker}
                value={`${selectedChatRoomData.averageReplyTime[index]}초`}
              />
            );
          })}
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarRankData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={45} domain={[0, Object.keys(radarRankData[0]).length - 2]} />
          {chatRoomNames.map((el: any, index: number) => {
            return (
              <Radar
                name={el}
                dataKey={index.toString()}
                stroke={colors[index]}
                fill={colors[index]}
                fillOpacity={0.6}
              />
            );
          })}
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </>
  );
};

export default SummaryPieGraph;
