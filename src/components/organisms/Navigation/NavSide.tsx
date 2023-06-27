import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Img from "../../atoms/Img";
import { HiMenu } from "react-icons/hi";
import Icon from "../../atoms/Icon";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import DashboardSideMenu from "../../sections/dashboard/DashboardSideMenu";
import { useSelector } from "react-redux";
import { NavProps } from "../../sections/navigation/Navigation";
import { FlexCenterDiv, FlexColumnDiv } from "../../atoms/FlexDiv";
import Paragraph from "../../atoms/Paragraph";

const NavSideBox = styled(FlexColumnDiv)<{ isSideMenuChatRoom: boolean }>`
  position: absolute;
  top: 0;
  left: ${(props) => (props.isSideMenuChatRoom ? "0" : "-100%")};
  width: 40%;
  height: 100vh;
  background: ${(props) => props.theme.mainWhite};
  overflow: ${(props) => (props.isSideMenuChatRoom ? "hidden" : "auto")};
  transition: left 0.3s;
  z-index: 999;

  @media (max-width: 768px) {
    width: 50%;
  }

  @media (max-width: 480px) {
    width: 70%;
  }

  @media (max-width: 320px) {
    width: 80%;
  }
`;

const TopContent = styled.div`
  padding: 0 20px 0 20px;
  display: flex;
  align-items: center;
  line-height: 70px;
`;

const NavMenuIcon = styled(Icon)`
  display: none;
  width: 50%;
  font-size: 3rem;

  > * {
    cursor: pointer;
  }
  @media (max-width: 1200px) {
    display: flex;
  }
`;

const H2 = styled(FlexCenterDiv)`
  width: 120px;
  transform: translateX(-50%);
`;

const PageLink = styled.div`
  display: flex;
  gap: 60px;

  @media (max-width: 1200px) {
    width: 100%;
    flex-direction: column;
    gap: 0;
    font-size: 2rem;
    text-align: center;
    > * {
      line-height: 3em;
      border-bottom: 1px solid ${(props) => props.theme.border};
      &:hover {
        background: ${(props) => props.theme.border};
      }
    }
    > :first-child {
      border-top: 1px solid ${(props) => props.theme.border};
    }
  }
`;

const AnalysisBox = styled(FlexCenterDiv)`
  padding: 15px 0;
  gap: 10px;
`;

const AnalysisMenu = styled(Paragraph)`
  font-weight: 700;
  font-size: 2.2rem;
`;

const NavSideContainer = styled.div<{ isWideScreen?: Boolean }>`
  display: ${(props) => (props.isWideScreen ? "none" : "block")};
`;

const NavSideShadow = styled.div<{ isSideMenuVisible?: Boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  opacity: 0.8;
  z-index: 800;
  background-color: ${(props) => props.theme.mainBlack};
  visibility: ${(props) => (props.isSideMenuVisible ? "visible" : "hidden")};
  opacity: ${(props) => (props.isSideMenuVisible ? "0.6" : "0")};
  transition: 0.2s;
`;

interface NavSideMenuProps extends NavProps {
  isWideScreen: boolean;
}

const NavSide: React.FC<NavSideMenuProps> = ({
  closeMenu,
  isWideScreen,
  isDarkMode,
  isAnalyzedMessagesExist,
}) => {
  const isSideMenuChatRoom = useSelector(
    (state: { isSideMenuChatRoomSelectSlice: boolean }) => state.isSideMenuChatRoomSelectSlice
  );

  const scrollY = window.scrollY;
  const bodyStyle = document.body.style;

  const handleClickGoToDescription = () => {
    closeMenu();
  };

  useEffect(() => {
    if (isSideMenuChatRoom) {
      bodyStyle.position = "fixed";
      bodyStyle.top = `-${scrollY}px`;
      bodyStyle.overflowY = "scroll";
      bodyStyle.width = "100%";

      if (isWideScreen) {
        bodyStyle.cssText = "";
      }

      return () => {
        bodyStyle.cssText = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isSideMenuChatRoom, isWideScreen]);

  const isSideMenuVisible = !isWideScreen && isSideMenuChatRoom;

  return (
    <NavSideContainer isWideScreen={isWideScreen}>
      <NavSideBox isSideMenuChatRoom={isSideMenuChatRoom}>
        <TopContent>
          <NavMenuIcon>
            <HiMenu onClick={closeMenu} />
          </NavMenuIcon>
          <H2 as="h2">
            <Link to="/" onClick={closeMenu}>
              <Img
                src={`${process.env.PUBLIC_URL}/images/logo/${
                  isDarkMode ? "logoGray" : "logoBlack"
                }.png`}
              />
            </Link>
          </H2>
        </TopContent>
        <PageLink>
          <Link to="/attachment" onClick={closeMenu}>
            <AnalysisBox>
              <AnalysisMenu>분석하기</AnalysisMenu>
              <BsFillArrowRightCircleFill />
            </AnalysisBox>
          </Link>
          <Link to="/" onClick={closeMenu}>
            메인
          </Link>
          <Link to={`/attachment#description`} onClick={handleClickGoToDescription}>
            첨부방법
          </Link>
          {isAnalyzedMessagesExist && (
            <Link to="/detail" onClick={closeMenu}>
              결과화면
            </Link>
          )}
          {isAnalyzedMessagesExist && <DashboardSideMenu />}
        </PageLink>
      </NavSideBox>
      <NavSideShadow onClick={closeMenu} isSideMenuVisible={isSideMenuVisible} />
    </NavSideContainer>
  );
};

export default NavSide;
