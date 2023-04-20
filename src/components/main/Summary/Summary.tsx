import React from "react";
import { AnalyzedMessages } from "../Main";
import { useSelector } from "react-redux";

const Summary = () => {
  const results = useSelector((state: { analyzedMessageSlice: AnalyzedMessages }) => state.analyzedMessageSlice);
  return <div>서마리</div>;
};

export default Summary;
