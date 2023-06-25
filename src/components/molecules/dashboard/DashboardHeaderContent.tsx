import React from "react";
import styled from "styled-components";
import Span from "../../atoms/Span";
import { FlexColumnDiv } from "../../atoms/FlexDiv";

const HeadContentBox = styled(FlexColumnDiv)`
  height: 100%;
  > :nth-child(2) {
    margin-top: 12px;
  }
`;

const HeadSubject = styled(Span)`
  color: #7e848a;
`;
const HeadContent = styled(Span)`
  font-size: 24px;
  font-weight: 700;
  text-align: right;
`;

type headerContentProps = {
  headerTitle: string;
  headerContent: string;
};

const DashboardHeaderContent = ({ data }: { data: headerContentProps }) => {
  return (
    <HeadContentBox>
      <HeadSubject>{data.headerTitle}</HeadSubject>
      <HeadContent>{data.headerContent}</HeadContent>
    </HeadContentBox>
  );
};

export default DashboardHeaderContent;
