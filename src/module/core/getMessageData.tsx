import {
  ChatDataDetail,
  Chatroom,
  KeywordCounts,
  MessageInfo,
  OriginMessageData,
  ReplyTime,
} from "../../@types/index.d";

/**
 * 새로운 스피커를 추가합니다.
 * @param messageData - 메시지 데이터 배열
 * @param speaker - 추가할 스피커
 */
const addNewSpeaker = (messageData: Chatroom[], speaker: string) => {
  messageData.push({ speaker, dates: [] });
};

/**
 * 대화방에서 특정 사용자의 인덱스를 찾습니다.
 * @param {Chatroom[]} messageData - 대화방 데이터
 * @param {string} speaker - 찾을 사용자의 이름
 * @returns {number} - 사용자 인덱스, 찾지 못한 경우 -1 반환
 */
const findSpeakerIndex = (messageData: Chatroom[], speaker: string) => {
  return messageData.findIndex((item) => item.speaker === speaker);
};

/**
 * 대화방 데이터에 새로운 메시지 데이터 객체를 추가합니다.
 * @param {MessageInfo[]} dates - 대화방 데이터
 * @param {string} date - 추가할 메시지 데이터의 날짜
 */
const pushMessageDataForm = (dates: MessageInfo[], date: string) => {
  dates.push({
    date: date,
    data: {
      chatTimes: {},
      keywordCounts: {},
      replyTime: { previous: 0, difference: 0, count: 0 },
    },
  });
};

/**
 * 대화방에서 특정 시간대의 채팅 횟수를 추가합니다.
 * @param {ChatDataDetail} todayDateValue - 대화방 데이터
 * @param {string} currentTime - 추가할 시간대
 */
const addNewChatTime = (todayDateValue: ChatDataDetail, currentTime: string) => {
  const lastChatTime: undefined | number = todayDateValue.chatTimes[currentTime];
  todayDateValue.chatTimes[currentTime] = (lastChatTime || 0) + 1;
};

/**
 * 대화방에서 특정 키워드의 빈도수를 추가합니다.
 * @param {KeywordCounts} keywordCountObject - 키워드 빈도수 객체
 * @param {string[]} keywords - 추가할 키워드 배열
 */
const addNewKeywordCount = (keywordCountObject: KeywordCounts, keywords: string[]) => {
  for (const keyword of keywords) {
    keywordCountObject[keyword] = (keywordCountObject[keyword] || 0) + 1;
  }
};

/**
 * 대화방에서 특정 사용자의 응답 시간 정보를 추가합니다.
 * @param {ChatDataDetail} todayDateValue - 대화방 데이터
 * @param {string} speaker - 사용자 이름
 * @param {string | undefined} rightBeforeSpeaker - 직전 메시지의 사용자 이름
 * @param {number | undefined} rightBeforeMessageTime - 직전 메시지의 시간
 * @param {number} minuteTime - 현재 메시지의 시간
 */
const addNewReplyTime = (
  todayDateValue: ChatDataDetail,
  speaker: string,
  rightBeforeSpeaker: string | undefined,
  rightBeforeMessageTime: number | undefined,
  minuteTime: number
) => {
  const replyTimeObject: ReplyTime = todayDateValue.replyTime;
  if (rightBeforeSpeaker && rightBeforeSpeaker !== speaker) {
    const difference: number = minuteTime - (rightBeforeMessageTime || 0);
    replyTimeObject.difference += difference >= 0 ? difference : 0;
    replyTimeObject.previous = minuteTime;
    replyTimeObject.count++;
  }
};

export const getMessageData = (results: OriginMessageData[]) => {
  const messageData: any = [];
  let rightBeforeSpeaker: string | undefined;
  let rightBeforeMessageTime: number | undefined;

  for (const result of results) {
    const { date, hour, minute, speaker, keywords } = result;
    const currentTime: string = `${hour}:${minute}`;

    // 존재하는 speaker인지 찾기, 없다면? speaker, dates 정보 추가하기
    let speakerIndex: number = findSpeakerIndex(messageData, speaker);
    if (speakerIndex === -1) {
      addNewSpeaker(messageData, speaker);
      speakerIndex = messageData.length - 1;
    }

    // date에 current message date 있는지 찾기. 없다면? current message date, chatTimes: {} ,keywordCounts:{},replyTime:{} 추가하기
    let dates: MessageInfo[] = messageData[speakerIndex].dates;
    const lastMessageDate = dates.length && Object.values(dates[dates.length - 1])[0];
    if (lastMessageDate !== date) {
      pushMessageDataForm(dates, date);
    }

    // date정보의 마지막 요소에 current chat time있는지 찾기. 없다면? chatTimes object 추가하기, 있다면? chatTimes count++
    const todayDateValue: ChatDataDetail = dates[dates.length - 1].data;
    addNewChatTime(todayDateValue, currentTime);

    // keywordCount있는지 찾기. 없다면? keywordCounts object 추가하기. 있다면? 키워드 또는 카운트 추가하기
    const keywordCountObject: KeywordCounts = todayDateValue.keywordCounts;
    addNewKeywordCount(keywordCountObject, keywords);

    // 직전의 메시지가 현재 메시지와 다른사람일 경우, 현재 메시지 - 직전의 메시지 시간을 더하고 count++
    const minuteTime: number = parseInt(hour) * 60 + parseInt(minute);
    addNewReplyTime(todayDateValue, speaker, rightBeforeSpeaker, rightBeforeMessageTime, minuteTime);
    rightBeforeSpeaker = messageData[speakerIndex].speaker;
    rightBeforeMessageTime = minuteTime;
  }

  return messageData;
};
