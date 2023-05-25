import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AnalyzedMessage } from "../../@types/index.d";
import Span from "../atoms/Span";
import ChatRateGraph from "./graphs/ChatRateGraph";
import ChatRoomCompareGraph from "./graphs/ChatRoomCompareGraph";
import ChatVolumeByPeriodGraph from "./graphs/ChatVolumeByPeriodGraph";

const TempGraphBox = styled.div`
  height: 100%;
  padding: 10px;
  margin: 0 auto;
`;

type GraphBoxData = {
  id: string;
  message: string;
  graph: JSX.Element;
};
const GraphBox = ({ data }: { data: GraphBoxData }) => {
  const results = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage }) => state.analyzedMessagesSlice
  );
  return (
    <TempGraphBox key={data.id}>
      <Span>{data.message}</Span>
      {Array.isArray(results) && results.length !== 0 && data.graph}
    </TempGraphBox>
  );
};

export default GraphBox;
