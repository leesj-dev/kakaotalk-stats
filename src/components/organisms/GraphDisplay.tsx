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
  subject: string;
  graph: JSX.Element;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentModalData: React.Dispatch<React.SetStateAction<any>>;
};

const GraphBox = ({ data }: { data: GraphBoxProps }) => {
  const isAnalyzedMessagesExist = useSelector(
    (state: { isAnalyzedMessagesExistSlice: boolean }) => state.isAnalyzedMessagesExistSlice
  );

  const modalData = {
    id: data.id,
    subject: data.subject,
    graph: data.graph,
  };

  const handleClickOpenModalButton = (id: number) => {
    data.setIsModalVisible(true);
    data.setCurrentModalData(modalData);
  };
  return (
    <TempGraphBox key={data.id}>
      {data.id !== 0 && (
        <IconBox onClick={() => handleClickOpenModalButton(data.id)}>
          <Icon>🌟</Icon>
        </IconBox>
      )}
      <Span>{data.subject}</Span>
      {isAnalyzedMessagesExist && data.graph}
    </TempGraphBox>
  );
};

export default GraphBox;
