import React, { ReactNode } from "react";
import styled from "styled-components";

type WrapperProps = {
  children: ReactNode;
};

const Wrap = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

const Wrapper = ({ children }: WrapperProps) => {
  return <Wrap>{children}</Wrap>;
};

export default Wrapper;
