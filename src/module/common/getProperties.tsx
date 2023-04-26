import { AnalyzedMessage } from "../../@types/index.d";

const extractProperty = (property: string) => {
  return (results: AnalyzedMessage[]) => {
    return results.map((chatroom: any) => {
      return chatroom.map((messages: any) => {
        return messages.map((message: any) => {
          return message[property];
        });
      });
    });
  };
};

export const getSpeakers = (results: AnalyzedMessage[]) => {
  return results.map((chatroom: any) => {
    return chatroom.map((messages: any) => {
      return messages[0].speaker;
    });
  });
};
export const getDates = extractProperty("date");
export const getChatTimes = extractProperty("chatTimes");
export const getKeywordCounts = extractProperty("keywordCounts");
export const getReplyTimes = extractProperty("replyTime");
