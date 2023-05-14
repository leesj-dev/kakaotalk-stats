import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AnalyzedMessage, ChatTimes } from "../../../@types/index.d";
import { getChatTimes } from "../../../module/common/getProperties";
import { getMostChattedTimes } from "../Summary/pieGraphForSummary/PieGraphForSummary";

const MostChatTimesGraph = () => {
  const analyzedMessages = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage[] }) => state.analyzedMessagesSlice
  );
  const selectedChatRoomIndex = useSelector(
    (state: { selectedRoomIndexSlice: number }) => state.selectedRoomIndexSlice
  );

  const chatTimes: ChatTimes[][][] = getChatTimes(analyzedMessages);
  const mostChattedTimes: [string, number][] = getMostChattedTimes(chatTimes)[selectedChatRoomIndex];
  const sortedTimes = mostChattedTimes.sort((a: any, b: any) => a[0] - b[0]);

  const data = sortedTimes.map((item: [string, number]) => {
    return { name: item[0], value: item[1] };
  });

  useEffect(() => {}, [selectedChatRoomIndex]);

  return (
    <div>
      <ResponsiveContainer width="100%" height={500}>
        <AreaChart
          width={500}
          height={400}
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
    </div>
  );
};

export default MostChatTimesGraph;
