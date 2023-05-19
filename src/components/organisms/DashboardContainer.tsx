import React, { ReactNode } from "react";
import styled from "styled-components";

const DashboardContainerBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

interface DashboardContainerProps {
  children: ReactNode | string;
}

const DashboardContainer = ({ children }: DashboardContainerProps) => {
  return <DashboardContainerBox>{children}</DashboardContainerBox>;
};

export default DashboardContainer;
