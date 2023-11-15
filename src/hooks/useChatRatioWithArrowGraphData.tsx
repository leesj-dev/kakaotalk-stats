import { useState, useEffect } from "react";
import { reduceAPlusB } from "../module/common/reduceAPlusB";
import { colorsForGraphArray } from "../module/common/colorsForGraphArray";

const useChatRatioWithArrowGraphData = (props: any) => {
  const { analyzedMessages, selectedChatRoomIndex } = props;

  const [arrowGraphData, setArrowGraphData] = useState<any[]>([]);
  const [selectedChatRoomData, setSelectedChatRoomData] = useState(
    analyzedMessages[selectedChatRoomIndex]
  );

  useEffect(() => {
    setSelectedChatRoomData(analyzedMessages[selectedChatRoomIndex]);
    let speakerTotalChatCounts: any = {};
    let totalChatCount: number;
    Object.values(selectedChatRoomData).forEach((chatroom: any) => {
      Object.values(chatroom).forEach((chatData: any) => {
        const { speaker } = chatData;
        if (!speakerTotalChatCounts[speaker]) {
          speakerTotalChatCounts[speaker] = 0;
        }
        const { chatTimes } = chatData;
        const chatCounts = chatTimes ? Object.values(chatTimes) : [];
        const totalChatCount = reduceAPlusB(chatCounts);
        speakerTotalChatCounts[speaker] += Number(totalChatCount);
      });
    });
    totalChatCount = reduceAPlusB(Object.values(speakerTotalChatCounts));
    const result = Object.entries(speakerTotalChatCounts).map((nameValueTuple, index) => {
      const [name, value] = nameValueTuple;
      return {
        name,
        value: Number((((value as number) / totalChatCount) * 100).toFixed(0)),
        color: colorsForGraphArray[index % colorsForGraphArray.length],
      };
    });
    setArrowGraphData(result);
  }, [analyzedMessages, selectedChatRoomIndex]);

  return { arrowGraphData };
};

export default useChatRatioWithArrowGraphData;
