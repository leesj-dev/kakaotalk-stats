// getChatTime 함수는 User의 채팅이 어느 시간대에 몇 회가 나타나는지 확인하는 데이터를 반환한다.
const getChatTime = (inputData, data) => {
  // speaker object를 찾습니다
  let foundData = data.find((item) => item.speaker === inputData.speaker);

  // 존재하지 않으면 {speaker:inputData.speaker, fullData:[]}를 넣습니다.
  // { speaker: "승지", fullData: [] }
  if (!foundData) {
    foundData = { speaker: inputData.speaker, fullData: [] };
  }

  const latestDate = foundData.fullData.at(-1);

  const inputChatTime = `${inputData.hour.toString().padStart(2, "0")}:${inputData.minute.toString().padStart(2, "0")}`;

  // 해당하는 일자가 없다면 day와 chatTime 배열 생성
  if (!latestDate) {
    foundData.fullData.push({ date: `${inputData.year}${inputData.month}${inputData.day.toString().padStart(2, "0")}`, chatTime: [{ [inputChatTime]: 1 }] });
  }

  const foundChatTime = foundData.fullData.at(-1);

  Object.keys(foundChatTime.chatTime.at(-1))[0] === inputChatTime
    ? foundChatTime.chatTime[foundChatTime.chatTime.length - 1][inputChatTime]++
    : foundData.fullData.chatTime.push({ [inputData.chatTime]: 1 });
  console.log(foundData);
};

// const result = getChatTime(inputData1);

// const inputData1 = {
//   year: "22",
//   month: "11",
//   day: "5",
//   hour: 14,
//   minute: 1,
//   speaker: "쥬히",
//   message: "500을 적었는데 잘했어가 뜨죠?!",
//   keyword: ["500을", "적었는데", "잘했어가", "뜨죠?!"],
// };

// const data = [
//   {
//     speaker: "쥬히",
//     fullData: [
//       { date: 221105, chatTime: [{}] },
//       { date: 221106, chatTime: [{}] },
//     ],
//   },
//   {
//     speaker: "영한",
//     fullData: [
//       { date: 221105, chatTime: [{}] },
//       { date: 221106, chatTime: [{}] },
//     ],
//   },
//   {
//     speaker: "미선",
//     fullData: [
//       { date: 221105, chatTime: [{}] },
//       { date: 221106, chatTime: [{}] },
//     ],
//   },
//   {
//     speaker: "화영",
//     fullData: [
//       { date: 221105, chatTime: [{}] },
//       { date: 221106, chatTime: [{}] },
//     ],
//   },
//   {
//     speaker: "승지",
//     fullData: [
//       { date: 221105, chatTime: [{}] },
//       { date: 221106, chatTime: [{}] },
//     ],
//   },
// ];

// return { speaker: "쥬히", date: 221105, chatTime: "14:01" };

// 예시1)
// {
//   쥬히: {
//     221105: {
//       chatTime: {
//         "14:01": 1,
//       },
//     },
//   },
// };

// const inputData2 = {
//   year: "22",
//   month: "10",
//   day: "27",
//   hour: 16,
//   minute: 36,
//   speaker: "프밍고수영한씌",
//   message: "넹 같이해요",
//   keyword: ["넹", "넹", "같이해요"],
// };
// 예시2)
// {
//   프밍고수영한씌: {
//     221027: {
//       chatTime: {
//         "16:36": 1,
//       },
//     },
//   },
// };

module.exports = getChatTime;
