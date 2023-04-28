import { useSelector } from "react-redux";
import { TagCloud } from "react-tagcloud";
import { AnalyzedMessage } from "../../../@types/index.d";
import { ChangeEvent, useEffect, useState } from "react";
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

const WordCloud = () => {
  const analyzedMessages = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) =>
      state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );

  const [numberInput, setNumberInput] = useState<number>(50);
  const [displayKeywordCount, setDisplayKeywordCount] = useState<number>(50);

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
    const topNKeywords = sortedTransformedKeywordsArray.slice(0, n + 1);
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
    const topNKeywords = getTopNKeywords(allKeywords, displayKeywordCount);
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

  const handleChangeNumberInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNumberInput(Number(e.target.value));
  };

  const handleSubmitNumber = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisplayKeywordCount(numberInput);
  };

  useEffect(() => {
    console.log(currentKeywordCounts);
  }, [selectedChatRoomIndex]);

  return (
    <ul>
      <form action="" onSubmit={handleSubmitNumber}>
        <label>내 카톡 습관, 몇 개나 모아서 볼래?</label>
        <input
          name=""
          type="number"
          id=""
          value={numberInput}
          onChange={handleChangeNumberInput}
        />
        <button>확인</button>
      </form>
      {keywordData.length &&
        keywordData.map((data, index) => {
          return (
            <KeywordList>
              {speaker[index]}
              <TagCloud minSize={12} maxSize={100} tags={data} />
            </KeywordList>
          );
        })}
    </ul>
  );
};

export default WordCloud;
