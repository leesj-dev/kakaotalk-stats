import React from "react";
import styled from "styled-components";
import RadiusButton from "../atoms/Button";
import Span from "../atoms/Span";

const DropBox = styled.div`
  padding: 100px 200px;
  border: 3px dashed ${(props) => props.theme.mainGrey};
`;

const FileDrop = () => {
  return (
    <DropBox>
      <Span>파일 첨부를 위해서는 파일을 드래그하여 여기에 놓거나</Span>
      <RadiusButton>파일 첨부</RadiusButton>
      <Span>버튼을 클릭하세요</Span>
    </DropBox>
  );
};

export default FileDrop;
