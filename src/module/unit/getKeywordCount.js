// getKeywordCount 함수는 User의 채팅 키워드가 몇 회 등장하는지 확인하는 데이터를 반환한다.
const getKeywordCount = (inputData) => {
  // 함수 작성
  return;
};

const result = getKeywordCount(inputData1);

const inputData1 = {
  year: "22",
  month: "11",
  day: "5",
  hour: 14,
  minute: 1,
  speaker: "쥬히",
  message: "500을 적었는데 잘했어가 뜨죠?!",
  keyword: ["500을", "적었는데", "잘했어가", "뜨죠?!"],
};
// 예시1)
return { speaker: "쥬히", date: 221105, keywordCount: {} };
const d = {
  쥬히: {
    date: [
      {
        221105: {
          keywordCount: {
            "500을": 1,
            적었는데: 1,
            잘했어가: 1,
            "뜨죠?!": 1,
          },
        },
      },
    ],
  },
};

const inputData2 = {
  year: "22",
  month: "10",
  day: "27",
  hour: 16,
  minute: 36,
  speaker: "프밍고수영한씌",
  message: "넹 같이해요",
  keyword: ["넹", "넹", "같이해요"],
};
// 예시2)
// {
//   영한: {
//     221027: {
//       keywordCount: {
//         "넹": 2,
//         "같이해요": 1,
//       },
//     },
//   },
// };

export default getKeywordCount;
