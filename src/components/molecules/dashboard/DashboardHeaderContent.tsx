import styled from "styled-components";
import Span from "../../atoms/Span";
import { FlexColumnDiv } from "../../atoms/FlexDiv";

const HeadContentBox = styled(FlexColumnDiv)`
  width: 100%;
  height: 100%;
`;

const HeadSubject = styled(Span)<{ alignRight?: boolean }>`
  text-align: ${({ alignRight }) => (alignRight ? "right" : "left")};
  color: #7e848a;
`;

const HeadContent = styled(Span)`
  margin-top: 12px;
  font-size: 24px;
  font-weight: 700;
  text-align: right;
`;

type headerContentProps = {
  id: string;
  headerTitle: string;
  headerContent: string | JSX.Element;
};

const DashboardHeaderContent = ({ data }: { data: headerContentProps }) => {
  return (
    <HeadContentBox>
      <HeadSubject alignRight={data.id === "selectSpeaker"}>{data.headerTitle}</HeadSubject>
      <HeadContent>{data.headerContent}</HeadContent>
    </HeadContentBox>
  );
};

export default DashboardHeaderContent;
