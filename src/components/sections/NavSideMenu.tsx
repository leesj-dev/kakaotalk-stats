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

const slideInAnimation = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const MobileMenuBox = styled.div<{ isSideMenuChatRoom: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100vh;
  z-index: 999;
  background: ${(props) => props.theme.mainWhite};
  overflow: ${(props) => (props.isSideMenuChatRoom ? "hidden" : "auto")};
  transform: ${(props) => (props.isSideMenuChatRoom ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease-in-out;
  animation: ${(props) => (props.isSideMenuChatRoom ? slideInAnimation : "none")} 0.3s ease-in-out;

  &.active {
    display: block;
  }
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

const MobileMenuIcon = styled(Icon)`
  display: none;
  width: 50%;
  font-size: 3rem;

  > * {
    cursor: pointer;
  }
  @media (max-width: 1024px) {
    display: flex;
  }
`;

const H1 = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  transform: translateX(-50%);
`;

const PageLink = styled.div`
  display: flex;
  gap: 60px;

  @media (max-width: 1024px) {
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

const AnalysisBox = styled.div`
  padding: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
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
  return (
    <>
      {isSideMenuChatRoom && (
        <MobileMenuBox className={`${"active"}`} isSideMenuChatRoom>
          <TopContent>
            <MobileMenuIcon>
              <HiMenu onClick={closeMenu} />
            </MobileMenuIcon>
            <H1>
              <Link to="/" onClick={closeMenu}>
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
        </MobileMenuBox>
      )}
    </>
  );
};

export default NavBar;
