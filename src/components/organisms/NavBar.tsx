import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Img from "../atoms/Img";
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../style/Theme";
import { setIsDarkMode } from "../../store/reducer/isDarkModeSlice";
import { BsFillBrightnessHighFill, BsFillMoonStarsFill } from "react-icons/bs";
import { HiMenu } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import Icon from "../atoms/Icon";
import DashboardSideMenu from "../section/DashboardSideMenu";

const NavWrap = styled.div`
  position: relative;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
  color: ${(props) => props.theme.mainText};
  background-color: ${(props) => props.theme.navBackground};
  border-bottom: ${(props) => (props.theme === darkTheme ? "none" : `1px solid ${props.theme.border}`)};
`;
const Container = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1240px;
  min-width: 769px;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  line-height: 80px;
  @media (max-width: 768px) {
    min-width: 360px;
    line-height: 60px;
  }
`;

const H1 = styled.h1`
  height: 40px;
  &.active {
    padding-left: 20px;
    height: 30px;
    transform: translateY(-22px);
  }
`;
const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const PcMenu = styled.div`
  display: flex;
  align-items: center;
  font-size: 22px;
  gap: 60px;

  @media (max-width: 768px) {
    font-size: 18px;
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
  cursor: pointer;
  > * {
    color: ${lightTheme.navBackground};
    background: ${darkTheme.navBackground};
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
  background: #fff;
  border-radius: 50%;
  z-index: 1;
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
    display: block;
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
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 80%;
  height: 100vh;
  background-color: ${(props) => props.theme.mainWhite};
  z-index: 999;

  > :nth-child(1) {
    padding: 20px 20px 0 0;
  }
  > :nth-child(2) {
    margin: 0 auto;
  }
`;
const MobileMenuShadow = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 20%;
  height: 100vh;
  background-color: ${(props) => props.theme.mainBlack};
  opacity: 0.8;
  z-index: 999;
`;
const TopContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavBar = () => {
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
  const shouldRenderSingleChatRoomBox = window.innerWidth < 480;
  return (
    <NavWrap>
      <Container>
        <H1>
          <Link to="/">
            <Img src={`${process.env.PUBLIC_URL}/images/${isDarkMode ? "logoGray" : "logoBlack"}.png`} />
          </Link>
        </H1>
        <Menu>
          <PcMenu>
            <PageLink>
              {<Link to="/2">분석하기</Link>}
              {isAnalyzedMessagesExist && <Link to="/dashboard">결과화면</Link>}
            </PageLink>

            <DarkModeButton className={`${isDarkMode && "active"}`} onClick={handleClickDarkModeButton}>
              <ToggleCircle></ToggleCircle>
              <IconBox>
                <BsFillBrightnessHighFill />
                <BsFillMoonStarsFill />
              </IconBox>
            </DarkModeButton>
          </PcMenu>
          <MobileMenuIcon onClick={closeMenu}>
            <Icon fontSize="1.5em">
              <HiMenu />
            </Icon>
          </MobileMenuIcon>
          {isOpen ? (
            <MobileMenuBox className={`${"active"}`}>
              <MobileMenu>
                <TopContent>
                  <H1 className="active">
                    <Link to="/">
                      <Img
                        src={`${process.env.PUBLIC_URL}/images/${
                          isDarkMode ? "logoGray" : "logoBlack"
                        }.png`}
                      />
                    </Link>
                  </H1>
                  <Icon fontSize="2em">
                    <CgClose onClick={closeMenu} />
                  </Icon>
                </TopContent>

                <PageLink>
                  <Link to="/2">분석하기</Link>
                  {isAnalyzedMessagesExist && <Link to="/dashboard">결과화면</Link>}
                </PageLink>
                {isAnalyzedMessagesExist && <DashboardSideMenu />}
              </MobileMenu>
              <MobileMenuShadow></MobileMenuShadow>
            </MobileMenuBox>
          ) : null}
        </Menu>
      </Container>
    </NavWrap>
  );
};

export default NavBar;
