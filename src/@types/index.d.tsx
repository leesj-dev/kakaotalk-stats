import React, { ReactNode } from "react";

export type ChatTimes = { [time: string]: number };
export type KeywordCounts = { [keyword: string]: number };
export type ReplyTime = {
  previous: number;
  difference: number;
  count: number;
};
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
  day: string;
  hour: string;
  minute: string;
  month: string;
  speaker: string;
  year: string;
  keywords: string[];
};

export type MessageInfo = {
  date: string;
  data: {
    chatTimes: ChatTimes; // Record :string type의 키, number type의 value
    keywordCounts: KeywordCounts;
    replyTime: {
      previous: number;
      difference: number;
      count: number;
    };
  };
};

export interface Chatroom {
  speaker: string;
  dates: DateData[];
}

interface DateData {
  date: string;
  data: ChatDataDetail;
}

interface ChatDataDetail {
  chatTimes: ChatTimes;
  keywordCounts: KeywordCounts;
  replyTime: {
    previous: number;
    difference: number;
    count: number;
  };
}

export type ChatDataArray = Chatroom;

export type PieChartData = {
  name: string;
  value: number;
};

export type ValueCountPair = {
  value: string;
  count: number;
};

export type WrapperProps = {
  children: ReactNode;
};

export type selectedChatRoomData = {
  averageReplyTime: number[];
  mostChattedTimes: [string, number];
  speakerCount: number;
  speakers: string[];
  totalChatCount: number;
};
