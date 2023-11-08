import { useState } from "react";
import { useSelector } from "react-redux";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  getChatTimes,
  getDates,
  getReplyTimes,
  getSpeakers,
} from "../../../module/common/getProperties";
import { ChatTimes, GraphPropsInterface, ReplyTime } from "../../../@types/index.d";
import { getAverageReplyTime, getTotalChatCounts, getTwoLettersFromSpeakers } from "./SummaryPieGraph";
import { getNotDuplicatedChatDates } from "./ChatVolumeByPeriodGraph";
import { colorsForGraphArray, customTickColor } from "../../../module/common/colorsForGraphArray";
import { lightTheme } from "../../../style/Theme";
import { reduceAPlusB } from "../../../module/common/reduceAPlusB";
import { graphTooltipStyle } from "../../../style/specifiedCss/graphTooltip";

const radarSubjects = ["카톡 양", "답장속도", "인원", "기간", "이모티콘사진"];

const getDayDifference = (date1: Date, date2: Date) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const diffInMilliseconds = Math.abs(Number(date1) - Number(date2));
  const diffInDays = Math.round(diffInMilliseconds / oneDay);
  return diffInDays;
};

const getDateMilliseconds = (date: string) => {
  const dateNumber = Number(date);
  const year = 20 + dateNumber / 10000;
  const month = (dateNumber % 10000) / 100 - 1;
  const day = dateNumber % 100;
  return new Date(year, month, day);
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
      .map((value, index) => ({ value, index }))
      .sort((a, b) => b.value - a.value);

    let currentRank = subject[0].length + 1;
    let previousValue: number | null = null;
    const ranks: any[] = [];

    sortedNumbers.forEach((item) => {
      if (item.value !== previousValue) {
        currentRank -= 1;
      }
      ranks[item.index] = currentRank;
      previousValue = item.value;
    });
    ranksData.push(ranks);
  }

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

let speakers: string[][];
let chatRoomNames: string[];
let chatTimes: ChatTimes[][][];
let totalChatCounts: number[];
let replyTimes: ReplyTime[][][];
let averageReplyTime: number[][];
let dates: string[][];
let nfKeywordCountArray;
let radarData: any[];

const ChatRoomCompareGraph = ({ analyzedMessages, selectedChatRoomIndex }: GraphPropsInterface) => {
  const nfKeywordCounts = useSelector(
    (state: { nfKeywordCountsSlice: number[][] }) => state.nfKeywordCountsSlice
  );

  const [radarRankData, setRadarRankData] = useState<any[]>([]);

  if (!radarRankData.length) {
    speakers = getSpeakers(analyzedMessages);
    chatRoomNames = getTwoLettersFromSpeakers(speakers);
    chatTimes = getChatTimes(analyzedMessages);
    totalChatCounts = getTotalChatCounts(chatTimes);
    replyTimes = getReplyTimes(analyzedMessages);
    averageReplyTime = getAverageReplyTime(replyTimes);
    dates = getDates(analyzedMessages);
    nfKeywordCountArray = nfKeywordCounts.map((nfCountArray: number[]) => {
      return reduceAPlusB(nfCountArray);
    });

    const getRadarData = (nfKeywordCountArray: any) => {
      const radarData: any[] = [];

      for (let i = 0; i < totalChatCounts.length; i++) {
        const radarDatum: any = {};
        const notDuplicatedChatDates: string[] = getNotDuplicatedChatDates(dates[i]);
        const date1 = getDateMilliseconds(notDuplicatedChatDates[notDuplicatedChatDates.length - 1]);
        const date2 = getDateMilliseconds(notDuplicatedChatDates[0]);
        radarDatum["카톡 횟수"] = totalChatCounts[i];
        radarDatum["평균답장속도"] = reduceAPlusB(averageReplyTime[i]) / speakers[i].length;
        radarDatum["인원 수"] = speakers[i].length;
        radarDatum["기간"] = getDayDifference(date1, date2);
        radarDatum["이모티콘사진"] = Math.floor((nfKeywordCountArray[i] / totalChatCounts[i]) * 1000);
        radarData.push(radarDatum);
      }
      return radarData;
    };

    radarData = getRadarData(nfKeywordCountArray);

    setRadarRankData(getRadarRankData(radarData));
  }

  return (
    <>
      {radarRankData.length && (
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="70%"
            data={radarRankData}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" fontSize="1.8vh" tick={customTickColor} />
            <PolarRadiusAxis
              fontSize={10}
              angle={60}
              domain={[0, Object.keys(radarRankData[0]).length - 2]}
              tick={customTickColor}
            />
            {chatRoomNames.map((el: any, index: number) => {
              return (
                <Radar
                  key={index}
                  name={el.length > 20 ? `${el.slice(0, 22)}...` : el}
                  dataKey={index.toString()}
                  stroke={
                    selectedChatRoomIndex === index
                      ? lightTheme.mainBlack
                      : colorsForGraphArray[index % colorsForGraphArray.length]
                  }
                  strokeWidth={selectedChatRoomIndex === index ? 2 : 1}
                  fill={colorsForGraphArray[index % colorsForGraphArray.length]}
                  fillOpacity={0.3}
                  animationDuration={300}
                />
              );
            })}
            <Tooltip contentStyle={graphTooltipStyle} />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default ChatRoomCompareGraph;
