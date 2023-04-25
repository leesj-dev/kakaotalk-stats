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
    chatTimes: Record<string, number>; // Record :string type의 키, number type의 value
    keywordCounts: Record<string, number>;
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
  chatTimes: Record<string, number>;
  keywordCounts: Record<string, number>;
  replyTime: {
    previous: number;
    difference: number;
    count: number;
  };
}

export type ChatDataArray = Chatroom;

export type WrapperProps = {
  children: ReactNode;
};
