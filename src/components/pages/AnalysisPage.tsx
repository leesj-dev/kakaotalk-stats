import React, { useEffect } from "react";
import styled from "styled-components";
import scrollToEvent from "../../module/common/scrollEvent";
import DashboardSection from "../section/DashboardSection";
import DashboardSideMenu from "../section/DashboardSideMenu";

const AnalysisPageBox = styled.div`
  margin-top: 80px;
  display: flex;
  width: 100%;

  > :nth-child(1) {
    width: 15%;
  }
  > :nth-child(2) {
    width: 85%;
  }
`;

const AnalysisPage = () => {
  useEffect(() => {
    scrollToEvent(0, "auto");
  }, []);

  return (
    <AnalysisPageBox>
      <DashboardSideMenu />
      <DashboardSection />
    </AnalysisPageBox>
  );
};

export default AnalysisPage;
