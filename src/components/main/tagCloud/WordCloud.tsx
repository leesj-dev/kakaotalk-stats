import { useSelector } from "react-redux";
import { TagCloud } from "react-tagcloud";
import { AnalyzedMessage, ValueCountPair } from "../../../@types/index.d";
import { ChangeEvent, FormEvent, useState } from "react";
import { getKeywordCounts, getSpeakers } from "../../../module/common/getProperties";
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

/**
 * 모든 키워드에서 상위 N개의 키워드를 가져옵니다.
 * @param {KeywordCounts} allKeywords - 모든 키워드의 카운트입니다.
 * @param {number} n - 가져올 상위 키워드의 수입니다.
 * @returns {ValueCountPair[]} 상위 N개의 키워드입니다.
 */
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

/**
 * 각 speaker의 키워드 배열에서 상위 N개의 키워드를 가져옵니다.
 * @param {KeywordCounts[]} keywordsArray - speaker 키워드 배열입니다.
 * @returns {ValueCountPair[]} 상위 N개의 키워드입니다.
 */
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

/**
 * 상위 키워드에서 특정 키워드를 필터링합니다.
 * @param {ValueCountPair[][]} highKeywords - 상위 키워드 배열입니다.
 * @param {string[]} keywordsToFilter - 필터링할 키워드 배열입니다.
 * @returns {ValueCountPair[][]} 필터링된 상위 키워드 배열입니다.
 */
const filterSpecificKeywords = (highKeywords: ValueCountPair[][], keywordsToFilter: string[]) => {
  const filteredKeyword = highKeywords.map((keywordArray: ValueCountPair[]) =>
    keywordArray.filter((keyword: ValueCountPair) => !keywordsToFilter.includes(keyword.value))
  );
  return filteredKeyword;
};

/**
 * 상위 키워드에서 "ㅋ" 또는 "ㅎ"를 포함하는 키워드를 필터링합니다.
 * @param {ValueCountPair[][]} highKeywords - 상위 키워드 배열입니다.
 * @returns {ValueCountPair[][]} 필터링된 상위 키워드 배열입니다.
 */
const filterLaughterKeywords = (highKeywords: ValueCountPair[][]) => {
  const filteredKeyword = highKeywords.map((keywordArray: ValueCountPair[]) =>
    keywordArray.filter((keyword: ValueCountPair) => !keyword.value.includes("ㅋ" || "ㅎ"))
  );
  return filteredKeyword;
};

/**
 * 키워드 데이터에서 중복되는 키워드를 가져옵니다.
 * @param {any[]} keywordData - 키워드 데이터 배열입니다.
 * @returns {string[]} 중복되는 키워드 배열입니다.
 */
const getOverlappedKeyword = (keywordData: any[]) => {
  const overlappedKeyword: any = {};
  keywordData.forEach((keywords) => {
    keywords.forEach((keyword: any) => {
      overlappedKeyword[keyword.value] = Number(overlappedKeyword[keyword.value] || 0) + 1;
    });
  });
  const filteredKeyword = [];
  for (const keyword in overlappedKeyword) {
    overlappedKeyword[keyword] === 2 && filteredKeyword.push(keyword);
  }
  filteredKeyword.shift();
  return filteredKeyword;
};

const WordCloud = () => {
  const analyzedMessages = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );
  const selectedRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );
  const [numberInput, setNumberInput] = useState<number>(50);
  const [displayKeywordCount, setDisplayKeywordCount] = useState<number>(50);
  const [keywordToFilter, setKeywordToFilter] = useState<string[]>([]);

  /**
   * 현재 키워드 카운트 배열에서 speaker별로 상위 키워드를 가져옵니다.
   * @param {KeywordCounts[][]} currentKeywordCounts - 현재 키워드 카운트 배열입니다.
   * @returns {ValueCountPair[][]} speaker별로 상위 키워드입니다.
   */
  const getHighKeywords = (currentKeywordCounts: KeywordCounts[][], displayKeywordCount: number) => {
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

  const speaker: string[] = getSpeakers(analyzedMessages)[selectedRoomIndex];

  const keywordCounts: KeywordCounts[][][] = getKeywordCounts(analyzedMessages);
  const currentKeywordCounts: KeywordCounts[][] = keywordCounts[selectedRoomIndex];
  const keywordData: ValueCountPair[][] = getHighKeywords(currentKeywordCounts, displayKeywordCount);

  const overlappedKeyword = getOverlappedKeyword(keywordData);

  const handleChangeNumberInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNumberInput(Number(e.target.value));
  };

  const handleSubmitNumber = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisplayKeywordCount(numberInput);
  };

  const handClickExceptEmoticon = () => {
    const keywordsToCheck = ["이모티콘", "사진", "동영상"];
    if (!keywordsToCheck.some((keyword) => keywordToFilter.includes(keyword))) {
      setKeywordToFilter([...keywordToFilter, ...keywordsToCheck]);
    }
  };
  const handClickExceptLaughter = () => {
    const keywordsToCheck = ["ㅋ", "ㅎ"];
    if (!keywordsToCheck.some((keyword) => keywordToFilter.includes(keyword))) {
      setKeywordToFilter([...keywordToFilter, ...keywordsToCheck]);
    }
  };

  const handleClickDeleteKeyword = (index: number) => {
    const copiedFilterKeyword = [...keywordToFilter];
    copiedFilterKeyword.splice(index, 1);
    setKeywordToFilter(copiedFilterKeyword);
  };

  const [filterKeywordInput, setFilterKeywordInput] = useState<string>("");

  const handleFilterKeywordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterKeywordInput(e.target.value);
  };

  const handleFilterKeywordForm = (e: FormEvent, keywordToFilter: string[]) => {
    e.preventDefault();

    if (!keywordToFilter.includes(filterKeywordInput)) {
      setFilterKeywordInput("");
      setKeywordToFilter([...keywordToFilter, filterKeywordInput]);
    } else {
      window.alert("이미 포함되어있는 문구입니다.");
    }
  };

  return (
    <ul>
      키워드
      <form action="" onSubmit={(e) => handleFilterKeywordForm(e, keywordToFilter)}>
        <div onClick={handClickExceptEmoticon}>이모티콘,사진,동영상 제외하기</div>
        <div onClick={handClickExceptLaughter}>ㅋ,ㅎ 제외하기</div>
        <label htmlFor="">특정 문자를 포함한 키워드 제외하기</label>
        <input type="text" onChange={(e) => handleFilterKeywordInput(e)} value={filterKeywordInput} />
        <button>제외하기</button>
      </form>
      <div>
        <span>제외된 키워드:</span>
        {keywordToFilter.map((keyword: string, index: number) => (
          <div key={index}>
            {keyword}
            <span onClick={() => handleClickDeleteKeyword(index)}>X</span>
          </div>
        ))}
      </div>
      <form action="" onSubmit={handleSubmitNumber}>
        <label>내 카톡 습관, 몇 개나 모아서 볼래?</label>
        <input name="" type="number" id="" value={numberInput} onChange={handleChangeNumberInput} />
        <button>확인</button>
      </form>
      {keywordData.length &&
        keywordData.map((data: ValueCountPair[], index: number) => {
          return (
            <KeywordList key={index}>
              {speaker[index]}
              <TagCloud minSize={14} maxSize={100} tags={data} />
            </KeywordList>
          );
        })}
      <div>키워드 중에서 겹치는 말버릇 모아보기 {overlappedKeyword && overlappedKeyword.join(", ")}</div>
    </ul>
  );
};

export default WordCloud;
