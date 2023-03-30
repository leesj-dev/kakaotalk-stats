// getReplyTime 함수는 User의 평균 답장 속도를 구한다.
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

const getReplyTime = (inputData) => {
  // 함수 작성
  return;
};

const result = getReplyTime(inputData);

console.log(result);
// 예시1)
// {
//   쥬히: {
//     replyTime: {
//       221105: {
//         previous: "13:41",
//         difference: 20,
//       },
//     },
//   },
// };

// 예시2)
// {
//   영한: {
//     replyTime: {
//       230330: {
//         previous: "17:34",
//         difference: 30,
//       },
//     },
//   },
// };

export default getReplyTime;
