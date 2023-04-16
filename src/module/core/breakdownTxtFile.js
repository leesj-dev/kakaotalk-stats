const fs = require("fs").promises;

/**
 * txtFile을 넣으면 [{},{},{},{}] 형태의 데이터 반환
 * @param {"txtFile"[]} txtFiles
 * @returns {object[]}
 */
const breakdownTxtFile = async (txtFiles) => {
  const allMessageData = [];
  for (const txtFile of txtFiles) {
    try {
      const str = await fs.readFile(txtFile, "utf-8");
      const allLineArray = str.split("\n20");

      const filteredMessageLineArray = allLineArray.filter((line) => {
        return filterMessageLine(line);
      });

      allMessageData.push(getDataArrayFromLineArray(filteredMessageLineArray));
    } catch (error) {
      console.error(error);
    }
  }
  return allMessageData.flat();
};

const formatValue = (value) => {
  return value.toString().padStart(2, "0");
};

/**
 * 라인을 데이터로 반환
 * @param {string[]} filteredMessageLineArray
 * @returns {object[]}
 */
const getDataArrayFromLineArray = (filteredMessageLineArray) => {
  const result = filteredMessageLineArray.map((line, index) => {
    const [dateTime, content] = line.split(", ", 2);
    const [year, month, day, time] = dateTime.split(". ");
    let [fullHour, minute] = time.split(":");
    let [meridiem, hour] = fullHour.split(" ");
    if (hour === "12") hour = 0;
    const [speaker, message] = content.split(" : ");
    const keywords = message.split(" ").map((word) => word.trim());

    return {
      year: formatValue(year),
      month: formatValue(month),
      day: formatValue(day),
      hour: meridiem === "오전" ? formatValue(parseInt(hour)) : (parseInt(hour) + 12).toString(),
      minute: formatValue(parseInt(minute)),
      speaker,
      keywords,
    };
  });
  return result;
};

/**
 * txt파일에서 추출한 str을 넣으면 라인을 담은 배열 반환
 * @param {string} line
 * @returns {array[]}
 */
const filterMessageLine = (line) => {
  line = line.trim();

  if (!(parseInt(line.slice(0, 2)) < 100 && line.slice(2, 4) === ". ")) {
    return false;
  }
  return line;
};

const getMessageData = async () => {
  const results = await breakdownTxtFile(["c:/Users/young/Desktop/kmg/src/module/core/Talk_2023.3.23 02-10-1.txt"]);
  const messageData = [];
  let rightBeforeSpeaker;
  let rightBeforeMessageTime;

  for (const result of results) {
    const { year, month, day, hour, minute, speaker, keywords } = result;
    const todayDate = `${year}${month}${day}`;
    const currentTime = `${hour}:${minute}`;

    // speaker 찾기. 없다면? speaker와 date배열 추가하기
    let speakerIndex = messageData.findIndex((item) => item.speaker === speaker);
    if (speakerIndex === -1) {
      messageData.push({ speaker, date: [] });
      speakerIndex = messageData.length - 1;
    }

    // date에 current message date 있는지 찾기. 없다면? current message date, chatTimes: {} ,keywordCounts:{},replyTime:{} 추가하기
    let dates = messageData[speakerIndex].date;
    const lastMessageDate = dates.length && Object.keys(dates[dates.length - 1])[0];
    if (lastMessageDate !== todayDate) {
      dates.push({ [todayDate]: { chatTimes: {}, keywordCounts: {}, replyTime: { previous: 0, difference: 0, count: 0 } } });
    }

    // date정보의 마지막 요소에 current chat time있는지 찾기. 없다면? chatTimes object 추가하기, 있다면? chatTimes count++
    const todayDateValue = dates[dates.length - 1][todayDate];
    const lastChatTime = todayDateValue.chatTimes[currentTime];
    lastChatTime ? todayDateValue.chatTimes[currentTime]++ : (todayDateValue.chatTimes[currentTime] = 1);

    // keywordCount있는지 찾기. 없다면? keywordCounts object 추가하기. 있다면? 키워드 또는 카운트 추가하기
    const keywordCountObject = todayDateValue.keywordCounts;
    for (const keyword of keywords) {
      keywordCountObject[keyword] ? keywordCountObject[keyword]++ : (keywordCountObject[keyword] = 1);
    }

    // 직전의 메시지가 현재 메시지와 다른사람일 경우, 현재 메시지 - 직전의 메시지 시간을 더하고 count++
    const minuteTime = parseInt(hour * 60) + parseInt(minute);
    const replyTimeObject = todayDateValue.replyTime;

    if (rightBeforeSpeaker && rightBeforeSpeaker !== speaker) {
      replyTimeObject.difference += minuteTime - rightBeforeMessageTime >= 0 && minuteTime - rightBeforeMessageTime;
      replyTimeObject.previous = minuteTime;
      replyTimeObject.count++;
    }
    rightBeforeSpeaker = messageData[speakerIndex].speaker;
    rightBeforeMessageTime = minuteTime;
  }

  console.log(messageData);
  messageData.forEach((data) => {
    console.log(data[1]);
    data.date.forEach((item) => {
      console.log(item);
    });
  });
  return messageData;
};
// https://youtube.com/shorts/GC7jKUDSsXY?feature=share
// 유어턴 링 https://ad.goodneighbors.kr/turn22b/web/youtube/index.html?utm_medium=CPV&utm_source=%EC%9C%A0%ED%8A%9C%EB%B8%8C%EC%98%81%EC%83%81PC&utm_campaign=turn22b&utm_term=na1865a&utm_content=JV2_t&gclid=CjwKCAjw8-OhBhB5EiwADyoY1dLaqQZgBhEruVw89eG43PyDLkGUHm2xLu8QJ25oVBmTHqfOx6rBIhoCe4MQAvD_BwE
// 유니세프 팔찌 https://www.youtube.com/shorts/b3_lYgyRZS0

(async () => await getMessageData())();

module.exports = getMessageData;
