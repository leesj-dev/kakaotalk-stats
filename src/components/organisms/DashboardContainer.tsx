import React, { ReactNode } from "react";

interface DashboardContainerProps {
  children: ReactNode | string;
}

const DashboardContainer = ({ children }: DashboardContainerProps) => {
  return <div>{children}</div>;
};

export default DashboardContainer;
