import React, { ReactNode } from "react";
import styled from "styled-components";

type WrapperProps = {
  children: ReactNode;
};

const Container = styled.div``;

const Wrapper = ({ children }: WrapperProps) => {
  return <div>{children}</div>;
};

export default Wrapper;
