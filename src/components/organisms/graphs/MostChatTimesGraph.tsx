import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AnalyzedMessage, ChatTimes, StringNumberTuple } from "../../../@types/index.d";
import { getChatTimes } from "../../../module/common/getProperties";
import { getMostChattedTimes } from "./SummaryPieGraph";

const MostChatTimesGraph = () => {
  const analyzedMessages = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );

  const chatTimes: ChatTimes[][][] = getChatTimes(analyzedMessages);
  const mostChattedTimes: StringNumberTuple[] = getMostChattedTimes(chatTimes)[selectedChatRoomIndex];
  const sortedTimes: StringNumberTuple[] = mostChattedTimes.sort(
    (a: StringNumberTuple, b: StringNumberTuple) => Number(a[0]) - Number(b[0])
  );

  const data = sortedTimes.map((item: StringNumberTuple) => {
    return { name: item[0], value: item[1] };
  });

  useEffect(() => {}, [selectedChatRoomIndex]);

  return (
    <>
      시간대별 답장 횟수
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default MostChatTimesGraph;
