import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import Img from "../atoms/Img";
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../style/Theme";
import { setIsDarkMode } from "../../store/reducer/isDarkModeSlice";
import { BsFillBrightnessHighFill, BsFillMoonStarsFill } from "react-icons/bs";
import { HiMenu } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import Icon from "../atoms/Icon";
import DashboardSideMenu from "./DashboardSideMenu";
import { FlexCenterDiv } from "../styleComponents/FlexDiv";
import NavSideMenu from "./NavSideMenu";
import { setIsSideMenuChatRoom } from "../../store/reducer/isSideMenuChatRoomSelectSlice";

const NavWrap = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  color: ${(props) => props.theme.mainText};
  border-bottom: ${(props) => (props.theme === darkTheme ? "none" : `1px solid ${props.theme.border}`)};
  z-index: 999;
  background: ${(props) => props.theme.navBackground};
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1240px;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  line-height: 80px;

  > * {
    flex: 1;
  }
  @media (max-width: 1024px) {
    line-height: 70px;
  }
`;

const H1 = styled.h1`
  display: flex;

  height: 40px;
  &.active {
    width: 120px;
    transform: translateY(-22px);
  }
  @media (max-width: 1024px) {
    justify-content: center;
    width: 120px;
  }
`;

const MenuBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 20px;
`;

const PcMenu = styled.div`
  display: flex;
  gap: 60px;
  align-items: center;
  font-size: 2.2rem;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const DarkModeButton = styled.div`
  position: relative;
  width: 80px;
  height: 40px;
  cursor: pointer;

  > * {
    color: ${lightTheme.navBackground};
    background: ${darkTheme.navBackground};
    pointer-events: none;
  }
  &.active {
    > * {
      color: ${darkTheme.navBackground};
      background: ${lightTheme.navBackground};
    }
    > :nth-child(1) {
      left: 44px;
      background: ${darkTheme.navBackground};
      @media (max-width: 1024px) {
        left: 37px;
      }
    }
  }
  @media (max-width: 1024px) {
    width: 66px;
    height: 33px;
  }
`;

const ToggleCircle = styled.div`
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 5px;
  width: calc(50% - 8px);
  border-radius: 50%;
  z-index: 1;
  background: #fff;
`;

const IconBox = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  font-size: 2rem;
  > * {
    flex: 1;
  }
`;

const PageLink = styled.div`
  display: flex;
  gap: 60px;
`;

// const NoticeBox = styled(FlexCenterDiv)`
//   display: none;
//   position: absolute;
//   top: 110%;
//   left: 50%;
//   padding: 0px;
//   width: 220%;
//   height: 60%;
//   font-size: 14px;
//   font-weight: 500;
//   transform: translateX(-50%);
// `;

const MobileMenuBox = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    transform: translateY(4px);
  }
`;

const MobileMenuShadow = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  opacity: 0.8;
  z-index: 800;
  background-color: ${(props) => props.theme.mainBlack};
`;

const NavBar = () => {
  const dispatch = useDispatch();

  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1024);
  // const isDetailPage = useLocation().pathname.includes("detail");
  // const isDashboardPage = useLocation().pathname.includes("dashboard");

  const isSideMenuChatRoom = useSelector(
    (state: { isSideMenuChatRoomSelectSlice: boolean }) => state.isSideMenuChatRoomSelectSlice
  );
  const closeMenu = () => {
    dispatch(setIsSideMenuChatRoom(!isSideMenuChatRoom));
  };
  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isSideMenuChatRoom) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "auto";
      }
    };

    handleScroll(); // 초기 로드 시 스크롤 동작을 설정합니다.

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSideMenuChatRoom]);

  const isAnalyzedMessagesExist = useSelector(
    (state: { isAnalyzedMessagesExistSlice: boolean }) => state.isAnalyzedMessagesExistSlice
  );
  const isDarkMode = useSelector((state: { isDarkModeSlice: boolean }) => state.isDarkModeSlice);

  const handleClickDarkModeButton = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };
  return (
    <NavWrap>
      <Container>
        <MobileMenuBox>
          <Icon cursor="pointer" fontSize="3rem" onClick={closeMenu}>
            <HiMenu />
          </Icon>
        </MobileMenuBox>
        <H1>
          <Link to="/">
            <Img
              src={`${process.env.PUBLIC_URL}/images/logo/${isDarkMode ? "logoGray" : "logoBlack"}.png`}
            />
          </Link>
        </H1>
        <MenuBox>
          <PcMenu>
            <PageLink>
              <Link to="/attachment">분석하기</Link>
              {isAnalyzedMessagesExist && <Link to="/dashboard">결과화면</Link>}
            </PageLink>
          </PcMenu>
          <DarkModeButton className={`${isDarkMode && "active"}`} onClick={handleClickDarkModeButton}>
            <ToggleCircle></ToggleCircle>
            <IconBox>
              <BsFillBrightnessHighFill />
              <BsFillMoonStarsFill />
            </IconBox>
            {/* {(isDetailPage || isDashboardPage) && <NoticeBox>다크모드로 볼 때 더 잘보여요.</NoticeBox>} */}
          </DarkModeButton>
        </MenuBox>
      </Container>
      {window.innerWidth < 1024 && isSideMenuChatRoom && (
        <>
          <NavSideMenu />
          <MobileMenuShadow onClick={closeMenu} />
        </>
      )}
    </NavWrap>
  );
};

export default NavBar;
