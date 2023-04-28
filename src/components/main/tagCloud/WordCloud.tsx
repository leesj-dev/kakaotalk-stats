import { useSelector } from "react-redux";
import { TagCloud } from "react-tagcloud";
import { AnalyzedMessage, ValueCountPair } from "../../../@types/index.d";
import { ChangeEvent, useState } from "react";
import {
  getKeywordCounts,
  getSpeakers,
} from "../../../module/common/getProperties";
import { KeywordCounts } from "../../../@types/index.d";
import styled from "styled-components";

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
  const selectedRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );

  const [numberInput, setNumberInput] = useState<number>(50);
  const [displayKeywordCount, setDisplayKeywordCount] = useState<number>(50);

  const keywordCounts: KeywordCounts[][][] = getKeywordCounts(analyzedMessages);
  const currentKeywordCounts: KeywordCounts[][] =
    keywordCounts[selectedRoomIndex];

  const getTopNKeywords = (allKeywords: KeywordCounts, n: number) => {
    const keywordsEntries: ValueCountPair[] = Object.entries(allKeywords).map(
      ([value, count]) => ({ value, count })
    );
    const sortedKeywordsEntries: ValueCountPair[] = keywordsEntries.sort(
      (a: ValueCountPair, b: ValueCountPair) => b.count - a.count
    );
    const topNKeywords: ValueCountPair[] = sortedKeywordsEntries.slice(
      0,
      n + 1
    );
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
    const topNKeywords: ValueCountPair[] = getTopNKeywords(
      allKeywords,
      displayKeywordCount
    );
    return topNKeywords;
  };

  const getHighKeywords = (currentKeywordCounts: KeywordCounts[][]) => {
    const highKeywords: ValueCountPair[][] = [];
    for (const keywordsArray of currentKeywordCounts) {
      highKeywords.push(getTopNKeywordsFromSpeaker(keywordsArray));
    }
    return highKeywords;
  };
  const keywordData: ValueCountPair[][] = getHighKeywords(currentKeywordCounts);

  const speaker: string[] = getSpeakers(analyzedMessages)[selectedRoomIndex];

  const handleChangeNumberInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNumberInput(Number(e.target.value));
  };

  const handleSubmitNumber = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisplayKeywordCount(numberInput);
  };

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
        keywordData.map((data: ValueCountPair[], index: number) => {
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
