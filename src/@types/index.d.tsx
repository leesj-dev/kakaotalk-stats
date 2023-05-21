import { type } from "os";
import React, { ReactNode } from "react";

export type ChatTimes = { [time: string]: number };
export type KeywordCounts = { [keyword: string]: number };
export type ReplyTime = {
  previous: number;
  difference: number;
  count: number;
};
export interface ChatDataDetail {
  chatTimes: ChatTimes;
  keywordCounts: KeywordCounts;
  replyTime: ReplyTime;
}

export type AnalyzedMessage = {
  speaker: string;
  date: string;
  chatTimes: ChatTimes;
  keywordCounts: KeywordCounts;
  replyTime: ReplyTime;
};

export interface FileObject {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export type OriginMessageData = {
  date: string;
  hour: string;
  minute: string;
  speaker: string;
  keywords: string[];
};

export type MessageInfo = {
  date: string;
  data: ChatDataDetail;
};

export interface Chatroom {
  speaker: string;
  dates: MessageInfo[];
}

export type NameValuePair = {
  name: string;
  value: number;
};

export type ValueCountPair = {
  value: string;
  count: number;
};

export type selectedChatRoomData = {
  averageReplyTime: number[];
  mostChattedTimes: StringNumberTuple[];
  speakerCount: number;
  speakers: string[];
  totalChatCount: number;
};

export type WrapperProps = {
  children: ReactNode;
};

type TimeCount = {
  hour: string;
  value: number;
  index: number;
};

export type WeekData = {
  day: string;
  values: TimeCount[];
};

export type StringNumberTuple = [string, number];

export interface ReplyStackedAreaGraph {
  [speaker: string]: number | string;
}
