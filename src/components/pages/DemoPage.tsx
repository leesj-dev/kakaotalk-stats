import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import scrollToEvent from "../../module/common/scrollToEvent";
import DashboardSection from "../sections/dashboard/DashboardSection";
import DashboardSideMenu from "../sections/dashboard/DashboardSideMenu";
import { AnalyzedMessage } from "../../@types/index.d";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";

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
  const location = useLocation();
  const navigate = useNavigate();

  const [dummyData, setDummyData] = useState<AnalyzedMessage[]>([]);
  const demoChatRoomIndex = useRef<number>(0);

  const { pathname } = location;
  const isDemoPage = pathname.includes("/demo");

  const isAnalyzedMessagesExist = useSelector(
    (state: { isAnalyzedMessagesExistSlice: boolean }) => state.isAnalyzedMessagesExistSlice
  );

  // 분석된 메시지가 존재할 시 대시보드로 이동
  if (isAnalyzedMessagesExist && isDemoPage) {
    navigate("/dashboard", { state: pathname });
  }

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
      {!isAnalyzedMessagesExist && (
        <>
          <DashboardSideMenu
            analyzedMessages={dummyData}
            selectedChatRoomIndex={demoChatRoomIndex.current}
          />
          <DashboardSection
            analyzedMessages={dummyData}
            selectedChatRoomIndex={demoChatRoomIndex.current}
          />
        </>
      )}
    </DashboardBox>
  );
};

export default DemoPage;
