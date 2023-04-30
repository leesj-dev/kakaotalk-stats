import {
  ChatDataDetail,
  Chatroom,
  KeywordCounts,
  MessageInfo,
  OriginMessageData,
  ReplyTime,
} from "../../@types/index.d";

const pushMessageInfo = (dates: MessageInfo[], todayDate: string) => {
  dates.push({
    date: todayDate,
    data: {
      chatTimes: {},
      keywordCounts: {},
      replyTime: { previous: 0, difference: 0, count: 0 },
    },
  });
};

export const getMessageData = (results: OriginMessageData[]) => {
  const messageData = [];
  let rightBeforeSpeaker: string | undefined;
  let rightBeforeMessageTime: number | undefined;

  for (const result of results) {
    const { year, month, day, hour, minute, speaker, keywords } = result;
    const todayDate: string = `${year}${month}${day}`;
    const currentTime: string = `${hour}:${minute}`;

    // 존재하는 speaker인지 찾기, 없다면? speaker, dates 정보 추가하기
    let speakerIndex: number = messageData.findIndex((item) => item.speaker === speaker);
    if (speakerIndex === -1) {
      messageData.push({ speaker, dates: [] });
      speakerIndex = messageData.length - 1;
    }

    // date에 current message date 있는지 찾기. 없다면? current message date, chatTimes: {} ,keywordCounts:{},replyTime:{} 추가하기
    let dates: MessageInfo[] = messageData[speakerIndex].dates;
    const lastMessageDate = dates.length && Object.values(dates[dates.length - 1])[0];
    if (lastMessageDate !== todayDate) {
      pushMessageInfo(dates, todayDate);
    }

    // date정보의 마지막 요소에 current chat time있는지 찾기. 없다면? chatTimes object 추가하기, 있다면? chatTimes count++
    const todayDateValue: ChatDataDetail = dates[dates.length - 1].data;
    const lastChatTime: undefined | number = todayDateValue.chatTimes[currentTime];
    lastChatTime
      ? todayDateValue.chatTimes[currentTime]++
      : (todayDateValue.chatTimes[currentTime] = 1);

    // keywordCount있는지 찾기. 없다면? keywordCounts object 추가하기. 있다면? 키워드 또는 카운트 추가하기
    const keywordCountObject: KeywordCounts = todayDateValue.keywordCounts;
    for (const keyword of keywords) {
      keywordCountObject[keyword]
        ? keywordCountObject[keyword]++
        : (keywordCountObject[keyword] = 1);
    }

    // 직전의 메시지가 현재 메시지와 다른사람일 경우, 현재 메시지 - 직전의 메시지 시간을 더하고 count++
    const minuteTime: number = parseInt(hour) * 60 + parseInt(minute);
    const replyTimeObject: ReplyTime = todayDateValue.replyTime;
    if (rightBeforeSpeaker && rightBeforeSpeaker !== speaker) {
      const difference: number = minuteTime - (rightBeforeMessageTime || 0);
      replyTimeObject.difference += difference >= 0 ? difference : 0;
      replyTimeObject.previous = minuteTime;
      replyTimeObject.count++;
    }
    rightBeforeSpeaker = messageData[speakerIndex].speaker;
    rightBeforeMessageTime = minuteTime;
  }

  return messageData;
};

export const readAsDataURL = (file: File) => {
  return new Promise<string | null>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => resolve(reader.result as string | null);
  });
};
