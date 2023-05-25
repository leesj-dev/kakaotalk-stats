import React from "react";
import Span from "../atoms/Span";
type headerContentProps = {
  headerTitle: string;
  headercontent: string;
};

const DashboardHeaderContent = ({ data }: { data: headerContentProps }) => {
  return (
    <>
      <Span color="#7e848a">{data.headerTitle}</Span>
      <Span fontSize="24px" fontWeight="bold" textAlign="right">
        {data.headercontent}
      </Span>
    </>
  );
};

export default DashboardHeaderContent;
