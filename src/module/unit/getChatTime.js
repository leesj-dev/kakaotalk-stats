// getChatTime 함수는 User의 채팅이 어느 시간대에 몇 회가 나타나는지 확인하는 데이터를 반환한다.
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

const getChatTime = (inputData) => {
  // 함수 작성
  return;
};

const result = getChatTime(inputData);

console.log(result);
// 예시1)
// {
//   쥬히: {
//     chatTime: {
//       221105: {
//         "14:00": 1,
//       },
//     },
//   },
// };

// 예시2)
// {
//   영한: {
//     chatTime: {
//       230330: {
//         "00:10": 1,
//       },
//     },
//   },
// };

export default getChatTime;
