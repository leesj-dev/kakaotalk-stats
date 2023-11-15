import styled from "styled-components";
import { FlexColumnDiv } from "../../atoms/FlexDiv";
import { useSelector } from "react-redux";
import { ChatTimes, GraphPropsInterface, StringNumberTuple } from "../../../@types/index.d";
import { getChatTimes, getSpeakers } from "../../../module/common/getProperties";
import { getTotalChatCounts } from "../../molecules/graphs/SummaryPieGraph";
import GraphDisplay from "./GraphDisplay";
import SpeakerSelect from "../../molecules/dashboard/SpeakerSelect";
import DashboardHeaderContent from "../../molecules/dashboard/DashboardHeaderContent";
import { borderRadius } from "../../../style/specifiedCss/borderRadius";

const HeadBox = styled.div`
  display: flex;
  height: calc((100% - 10px) * 0.15);
  gap: 10px;

  > * {
    background: var(--mainWhite);
    padding: 10px 20px 10px 15px;
    text-align: left;
    border-radius: ${borderRadius.medium};
    flex: 1;
  }
  > :nth-child(1) {
    flex: 1.3;
    flex-direction: row;
  }
`;

const DashboardContainer = styled(FlexColumnDiv)`
  width: 100%;
  height: 100%;
  gap: 15px;
  transition: background 0.3s;
`;

interface DashBoardHeaderInterface extends GraphPropsInterface {
  displaySubject: string;
  setCurrentModalData: (data: any) => void;
  zIndex: number;
  createGraphDisplayProps: any;
}

const DashBoardHeader = (props: DashBoardHeaderInterface) => {
  const { analyzedMessages, selectedChatRoomIndex, createGraphDisplayProps } = props;

  const mostChattedTimes = useSelector(
    (state: { mostChattedTimesSlice: StringNumberTuple[] }) => state.mostChattedTimesSlice
  );

  const speakers: string[][] = getSpeakers(analyzedMessages);
  const chatTimes: ChatTimes[][][] = getChatTimes(analyzedMessages);
  const totalChatCounts: number[] = getTotalChatCounts(chatTimes);

  const HeaderData = [
    {
      id: "selectSpeaker",
      headerTitle: "강조할 대화자",
      headerContent: (
        <SpeakerSelect
          analyzedMessages={analyzedMessages}
          selectedChatRoomIndex={selectedChatRoomIndex}
          alignItems="end"
        />
      ),
    },
    {
      id: "speakerCount",
      headerTitle: "대화자 수",
      headerContent: ` ${speakers[selectedChatRoomIndex]?.length || 0}`,
    },
    {
      id: "totalChatCount",
      headerTitle: "총 대화수",
      headerContent: `${totalChatCounts[selectedChatRoomIndex]?.toLocaleString() || 0}`,
    },
    {
      id: "mostChatTime",
      headerTitle: "주 대화 시간대",
      headerContent: `${mostChattedTimes[selectedChatRoomIndex]?.[0]?.[0] || 0}시`,
    },
  ];

  return (
    <HeadBox>
      {HeaderData.map((data) => {
        return (
          <DashboardContainer key={data.id}>
            {data.id === "selectSpeaker" && (
              <GraphDisplay {...createGraphDisplayProps("채팅방 대화 비율", 1)} />
            )}
            <DashboardHeaderContent data={data} key={data.id} />
          </DashboardContainer>
        );
      })}
    </HeadBox>
  );
};

export default DashBoardHeader;
