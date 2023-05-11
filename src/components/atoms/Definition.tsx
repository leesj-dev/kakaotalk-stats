import React from "react";
import styled from "styled-components";
const Mean = styled.p<{ fontSize?: string }>`
  font-size: ${(props) => props.fontSize};
  > * {
    margin-bottom: 15px;
  }
`;
const Definition = ({ content }: { content: string }) => {
  return (
    <Mean fontSize="22px">
      <p>{content}</p>
    </Mean>
  );
};

export default Definition;
