import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Span from "../atoms/Span";
import Icon from "../atoms/Icon";

const TempGraphBox = styled.div`
  position: relative;
  height: 100%;
  padding: 10px;
  margin: 0 auto;
`;

const IconBox = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

type GraphBoxProps = {
  id: number;
  message: string;
  graph: JSX.Element;
};
const GraphBox = ({ data }: { data: GraphBoxProps }) => {
  const isAnalyzedMessagesExist = useSelector(
    (state: { isAnalyzedMessagesExistSlice: boolean }) => state.isAnalyzedMessagesExistSlice
  );
  return (
    <TempGraphBox key={data.id}>
      <IconBox>
        <Icon>🌟</Icon>
      </IconBox>
      <Span>{data.message}</Span>
      {isAnalyzedMessagesExist && data.graph}
    </TempGraphBox>
  );
};

export default GraphBox;
