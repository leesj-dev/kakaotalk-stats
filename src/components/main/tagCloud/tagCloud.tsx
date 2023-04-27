import { useSelector } from "react-redux";
import { TagCloud } from "react-tagcloud";
import { AnalyzedMessage } from "../../../@types/index.d";
import { useEffect } from "react";
import {
  getKeywordCounts,
  getSpeakers,
} from "../../../module/common/getProperties";
import { KeywordCounts } from "../../../@types/index.d";
import styled from "styled-components";

type keywordValueCount = {
  value: string;
  count: number;
};

const KeywordList = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 500px;
  background: #f3f0ff;
`;

const SimpleCloud = () => {
  const analyzedMessages = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) =>
      state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );

  const keywordCounts = getKeywordCounts(analyzedMessages);
  const currentKeywordCounts = keywordCounts[selectedChatRoomIndex];

  const getTopNKeywords = (allKeywords: KeywordCounts, n: number) => {
    const transformedKeywordsArray: keywordValueCount[] = Object.entries(
      allKeywords
    ).map(([value, count]) => ({ value, count }));
    const sortedTransformedKeywordsArray = transformedKeywordsArray.sort(
      (a: any, b: any) => {
        return b.count - a.count;
      }
    );
    const topNKeywords = sortedTransformedKeywordsArray.slice(0, n);
    return topNKeywords;
  };

  const getTopNKeywordsFromSpeaker = (keywordsArray: KeywordCounts[]) => {
    const allKeywords: KeywordCounts = {};
    keywordsArray.forEach((keywords: KeywordCounts) => {
      for (const key in keywords) {
        allKeywords[key]
          ? (allKeywords[key] += keywords[key])
          : (allKeywords[key] = keywords[key]);
      }
    });
    const topNKeywords = getTopNKeywords(allKeywords, 100);
    return topNKeywords;
  };

  const getHighKeywords = (currentKeywordCounts: KeywordCounts[][]) => {
    const highKeywords = [];
    for (const keywordsArray of currentKeywordCounts) {
      highKeywords.push(getTopNKeywordsFromSpeaker(keywordsArray));
    }
    return highKeywords;
  };
  const keywordData = getHighKeywords(currentKeywordCounts);
  console.log("keywordData:", keywordData);

  const speaker = getSpeakers(analyzedMessages)[selectedChatRoomIndex];

  useEffect(() => {
    console.log(currentKeywordCounts);
  }, [selectedChatRoomIndex]);

  return (
    <ul>
      {keywordData.length &&
        keywordData.map((data, index) => {
          return (
            <KeywordList>
              {speaker[index]}
              <TagCloud minSize={12} maxSize={50} tags={data} />
            </KeywordList>
          );
        })}
    </ul>
  );
};

export default SimpleCloud;
