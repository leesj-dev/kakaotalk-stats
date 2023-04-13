// getChatCount 함수는 User의 채팅이 몇 회가 나타났는지 카운트한다.
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

const getChatCount = (inputData) => {
  // 함수 작성
  return;
};

const result = getChatCount(inputData);

console.log(result);
// 예시1)
// {
//   쥬히: {
//     221105: {
//       totalChatCount: {
//         "14:01": 1,
//       },
//     },
//   },
// };

// 예시2)
// {
//   영한: {
//     230330: {
//       totalChatCount: {
//         "00:10": 1,
//       },
//     },
//   },
// };

export default getChatCount;
