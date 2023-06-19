import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import Img from "../atoms/Img";
import { useDispatch, useSelector } from "react-redux";
import { HiMenu } from "react-icons/hi";
import Icon from "../atoms/Icon";
import DashboardSideMenu from "./DashboardSideMenu";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import Span from "../atoms/Span";
import { setIsSideMenuChatRoom } from "../../store/reducer/isSideMenuChatRoomSelectSlice";

const Container = styled.div``;

const H1 = styled.h1`
  position: absolute;
  left: 50%;

  height: 40px;
  transform: translate(-50%, -28px);
  &.active {
    height: 30px;
  }
  @media (max-width: 768px) {
    height: 30px;
  }
`;

const MenuBox = styled.div`
  display: flex;
  align-items: center;
`;

const MobileMenuIcon = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: flex;
    transform: translateY(4px);
  }
`;

const PageLink = styled.div`
  display: flex;
  gap: 60px;
  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: column;
    gap: 0;
    font-size: 2rem;
    font-weight: 300;
    text-align: center;
    > * {
      line-height: 3em;
      border-bottom: 1px solid ${(props) => props.theme.border};
    }
  }
`;

const slideInAnimation = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const MobileMenuBox = styled.div`
  &.active {
    display: block;
  }
`;

const MobileMenu = styled.div<{ isSideMenuChatRoom: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100vh;
  z-index: 999;
  overflow: ${(props) => (props.isSideMenuChatRoom ? "hidden" : "auto")};
  transform: ${(props) => (props.isSideMenuChatRoom ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease-in-out;
  animation: ${(props) => (props.isSideMenuChatRoom ? slideInAnimation : "none")} 0.3s ease-in-out;
  background-color: ${(props) => props.theme.mainWhite};
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

const MobileMenuShadow = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  opacity: 0.9;
  z-index: 800;
  background-color: ${(props) => props.theme.mainBlack};
`;

const TopContent = styled.div`
  padding: 0 20px 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const AnalysisBox = styled.div`
  padding: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-top: 2px solid ${(props) => props.theme.mainBlack};
  border-bottom: 2px solid ${(props) => props.theme.mainBlack};
`;

const NavBar = () => {
  const dispatch = useDispatch();
  const isAnalyzedMessagesExist = useSelector(
    (state: { isAnalyzedMessagesExistSlice: boolean }) => state.isAnalyzedMessagesExistSlice
  );
  const isDarkMode = useSelector((state: { isDarkModeSlice: boolean }) => state.isDarkModeSlice);
  const isSideMenuChatRoom = useSelector(
    (state: { isSideMenuChatRoomSelectSlice: boolean }) => state.isSideMenuChatRoomSelectSlice
  );

  const closeMenu = () => {
    dispatch(setIsSideMenuChatRoom(!isSideMenuChatRoom));
  };

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
  return (
    <Container>
      <MobileMenuIcon onClick={closeMenu}>
        <Icon fontSize="3rem">
          <HiMenu />
        </Icon>
      </MobileMenuIcon>
      <MenuBox>
        {isSideMenuChatRoom && (
          <MobileMenuBox className={`${"active"}`}>
            <MobileMenu isSideMenuChatRoom>
              <TopContent>
                <MobileMenuIcon onClick={closeMenu}>
                  <Icon fontSize="3rem">
                    <HiMenu />
                  </Icon>
                </MobileMenuIcon>
                <H1>
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
                <Link to="/attachment" onClick={closeMenu}>
                  <AnalysisBox>
                    <Span fontWeight="700">분석하기</Span>
                    <BsFillArrowRightCircleFill />
                  </AnalysisBox>
                </Link>
                <Link to="/" onClick={closeMenu}>
                  메인
                </Link>
                <Link to="/attachment" onClick={closeMenu}>
                  첨부방법
                </Link>
                {isAnalyzedMessagesExist && (
                  <Link to="/detail" onClick={closeMenu}>
                    결과화면
                  </Link>
                )}
                {isAnalyzedMessagesExist && <DashboardSideMenu />}
              </PageLink>
            </MobileMenu>
            <MobileMenuShadow></MobileMenuShadow>
          </MobileMenuBox>
        )}
      </MenuBox>
    </Container>
  );
};

export default NavBar;
