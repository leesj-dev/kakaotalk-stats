// getReplyTime 함수는 User의 평균 답장 속도를 구한다.
const getReplyTime = (inputData) => {
  // 함수 작성
  return;
};

const result = getReplyTime(inputData1);

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
return { speaker: "쥬히", date: 221105, replyTime: {} };

// 예시1)
// {
//   쥬히: {
//     221105: {
//       replyTime: {
//         previous: hour * 60 + minute,
//         difference: 20,
//         count:2,
//       },
//     },
//   },
// };

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
//       replyTime: {
//         previous: "hour" * 60 + "minute",
//         difference: 32,
//         count:2,
//       },
//     },
//   },
// };

export default getReplyTime;
