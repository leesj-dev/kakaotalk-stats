import { useEffect, useState } from "react";
import styled from "styled-components";
import scrollToEvent from "../../module/common/scrollToEvent";
import DashboardSection from "../sections/dashboard/DashboardSection";
import DashboardSideMenu from "../sections/dashboard/DashboardSideMenu";
import { AnalyzedMessage } from "../../@types/index.d";
import axios from "axios";

const DashboardBox = styled.div`
  margin-top: 80px;
  display: flex;
  width: 100%;

  > :nth-child(1) {
    width: 15%;
  }
  > :nth-child(2) {
    width: 85%;
  }
  @media (max-width: 1200px) {
    margin-top: 70px;
    > :nth-child(2) {
      width: 100%;
    }
  }
`;

const DemoPage = () => {
  const [dummyData, setDummyData] = useState<AnalyzedMessage[]>([]);
  const [selectedChatRoomIndex, setSelectedChatRoomIndex] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const result = await axios.get("/api/dummy");
      setDummyData([result.data.dummy.dummy]);
    })();
  }, []);

  useEffect(() => {
    scrollToEvent(0, "auto");
  }, []);

  return (
    <DashboardBox>
      <DashboardSideMenu analyzedMessages={dummyData} selectedChatRoomIndex={selectedChatRoomIndex} />
      <DashboardSection analyzedMessages={dummyData} selectedChatRoomIndex={selectedChatRoomIndex} />
    </DashboardBox>
  );
};

export default DemoPage;
