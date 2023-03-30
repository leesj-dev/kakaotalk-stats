// getKeywordCount 함수는 User의 채팅 키워드가 몇 회 등장하는지 확인하는 데이터를 반환한다.
// 예시)
const inputData = {
  year: "22",
  month: "11",
  day: "5",
  hour: 14,
  minute: 1,
  speaker: "쥬히",
  message: "500을 적었는데 잘했어가 뜨죠?!",
  keyword: ["500을", "적었는데", "잘했어가", "뜨죠?!"],
};

const getKeywordCount = (inputData) => {
  // 함수 작성
  return;
};

const result = getKeywordCount(inputData);

console.log(result);
// 예시1)
// {
//   쥬히: {
//     keywordCount: {
//       221105: {
//         "500을": 1,
//         "적었는데": 1,
//         "잘했어가": 1,
//         "뜨죠?!": 1,
//       },
//     },
//   },
// };

// 예시2)
// {
//   영한: {
//     keywordCount: {
//       230330: {
//         "안녕": 1,
//         "하세": 2,
//         "요": 4,
//       },
//     },
//   },
// };

export default getKeywordCount;
