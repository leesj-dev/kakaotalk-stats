import React from "react";
import styled from "styled-components";
import Span from "../atoms/Span";

const HeaderContentBox = styled.div``;

type headerContentProps = {
  headerTitle: string;
  headercontent: string;
};

const DashboardHeaderContent = ({ data }: { data: headerContentProps }) => {
  return (
    <HeaderContentBox>
      <Span color="#7e848a">{data.headerTitle}</Span>
      <Span fontSize="24px" fontWeight="bold" textAlign="right">
        {data.headercontent}
      </Span>
    </HeaderContentBox>
  );
};

export default DashboardHeaderContent;
