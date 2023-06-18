import React, { useState } from "react";
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
  @media (max-width: 768px) {
    width: 100%;
    line-height: 60px;
  }
`;

const H1 = styled.h1`
  height: 40px;
  &.active {
    height: 30px;
    transform: translateY(-22px);
  }
  @media (max-width: 480px) {
    height: 30px;
  }
`;

const MenuBox = styled.div`
  display: flex;
  align-items: center;
`;

const Menu = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const PcMenu = styled.div`
  display: flex;
  gap: 60px;
  align-items: center;
  font-size: 2.2rem;
  @media (max-width: 768px) {
    gap: 30px;
  }
  > :nth-child(1) {
    @media (max-width: 480px) {
      display: none;
    }
  }
`;

const DarkModeButton = styled.div`
  position: relative;
  width: 80px;
  height: 40px;
  transition: 0.3s;
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
      @media (max-width: 768px) {
        left: 34px;
      }
    }
  }
  @media (max-width: 768px) {
    width: 60px;
    height: 30px;
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
  > * {
    flex: 1;
  }
`;

const MobileMenuIcon = styled.div`
  display: none;
  @media (max-width: 480px) {
    display: flex;
  }
`;

const PageLink = styled.div`
  display: flex;
  gap: 60px;
  @media (max-width: 480px) {
    width: 100%;
    flex-direction: column;
    gap: 0;
    font-size: 18px;
    text-align: center;
    > * {
      border-bottom: 1px solid ${(props) => props.theme.border};
    }
  }
`;

const MobileMenuBox = styled.div`
  &.active {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100vh;
  z-index: 999;
  background-color: ${(props) => props.theme.mainWhite};
`;

const MobileMenuShadow = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 20%;
  height: 100vh;
  opacity: 0.8;
  z-index: 999;
  background-color: ${(props) => props.theme.mainBlack};
`;

const TopContent = styled.div`
  padding: 0 20px 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const NoticeBox = styled(FlexCenterDiv)`
  position: absolute;
  top: 110%;
  left: 50%;
  padding: 0px;
  width: 220%;
  height: 60%;
  font-size: 14px;
  font-weight: 500;
  transform: translateX(-50%);
`;

const NavBar = () => {
  const isDetailPage = useLocation().pathname.includes("detail");
  const isDashboardPage = useLocation().pathname.includes("dashboard");

  const dispatch = useDispatch();

  const isAnalyzedMessagesExist = useSelector(
    (state: { isAnalyzedMessagesExistSlice: boolean }) => state.isAnalyzedMessagesExistSlice
  );
  const isDarkMode = useSelector((state: { isDarkModeSlice: boolean }) => state.isDarkModeSlice);

  const handleClickDarkModeButton = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };
  const closeMenu = () => {
    setMenu(!isOpen);
  };
  const [isOpen, setMenu] = useState(false);

  return (
    <NavWrap>
      <Container>
        <MobileMenuIcon onClick={closeMenu}>
          <Icon fontSize="3rem">
            <HiMenu />
          </Icon>
        </MobileMenuIcon>
        <H1>
          <Link to="/">
            <Img
              src={`${process.env.PUBLIC_URL}/images/logo/${isDarkMode ? "logoGray" : "logoBlack"}.png`}
            />
          </Link>
        </H1>
        <MenuBox>
          <Menu>
            <PcMenu>
              <PageLink>
                <Link to="/attachment">분석하기</Link>
                {isAnalyzedMessagesExist && <Link to="/dashboard">결과화면</Link>}
              </PageLink>
              <DarkModeButton
                className={`${isDarkMode && "active"}`}
                onClick={handleClickDarkModeButton}
              >
                <ToggleCircle></ToggleCircle>
                <IconBox>
                  <BsFillBrightnessHighFill />
                  <BsFillMoonStarsFill />
                </IconBox>
                {(isDetailPage || isDashboardPage) && (
                  <NoticeBox>다크모드로 볼 때 더 잘보여요.</NoticeBox>
                )}
              </DarkModeButton>
            </PcMenu>
          </Menu>
          {isOpen ? (
            <MobileMenuBox className={`${"active"}`}>
              <MobileMenu>
                <TopContent>
                  <MobileMenuIcon onClick={closeMenu}>
                    <Icon fontSize="3rem">
                      <HiMenu />
                    </Icon>
                  </MobileMenuIcon>
                  <H1 className="active">
                    <Link to="/">
                      <Img
                        src={`${process.env.PUBLIC_URL}/images/logo/${
                          isDarkMode ? "logoGray" : "logoBlack"
                        }.png`}
                      />
                    </Link>
                  </H1>
                </TopContent>

                <PageLink>
                  {isAnalyzedMessagesExist && <DashboardSideMenu />}
                  <Link to="/attachment">분석하기</Link>
                  {isAnalyzedMessagesExist && <Link to="/detail">결과화면</Link>}
                </PageLink>
              </MobileMenu>
              <MobileMenuShadow></MobileMenuShadow>
            </MobileMenuBox>
          ) : null}
        </MenuBox>
      </Container>
    </NavWrap>
  );
};

export default NavBar;
