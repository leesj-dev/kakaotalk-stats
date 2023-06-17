import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import Img from "../atoms/Img";
import { useSelector } from "react-redux";
import { HiMenu } from "react-icons/hi";
import Icon from "../atoms/Icon";
import DashboardSideMenu from "./DashboardSideMenu";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import Span from "../atoms/Span";

const Container = styled.div``;

const H1 = styled.h1`
  height: 40px;
  &.active {
    height: 30px;
    transform: translateY(-22px);
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

const MobileMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100vh;
  z-index: 999;
  background-color: ${(props) => props.theme.mainWhite};
  transform: ${(props) => (props.isOpen ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease-in-out;
  animation: ${(props) => (props.isOpen ? slideInAnimation : "none")} 0.3s ease-in-out;
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
  opacity: 0.8;
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
const IconBox = styled.div`
  padding: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-top: 2px solid ${(props) => props.theme.mainBlack};
  border-bottom: 2px solid ${(props) => props.theme.mainBlack};
`;

const NavBar = () => {
  const isAnalyzedMessagesExist = useSelector(
    (state: { isAnalyzedMessagesExistSlice: boolean }) => state.isAnalyzedMessagesExistSlice
  );
  const isDarkMode = useSelector((state: { isDarkModeSlice: boolean }) => state.isDarkModeSlice);

  const closeMenu = () => {
    setMenu(!isOpen);
  };
  const [isOpen, setMenu] = useState(false);
  // const handleAttachMethodClick = () => {
  //   window.location.href = "/attachment#attachMethod";
  // };

  return (
    <Container>
      <MobileMenuIcon onClick={closeMenu}>
        <Icon fontSize="3rem">
          <HiMenu />
        </Icon>
      </MobileMenuIcon>
      <MenuBox>
        {isOpen ? (
          <MobileMenuBox className={`${"active"}`}>
            <MobileMenu isOpen={isOpen}>
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
                <Link to="/attachment" onClick={closeMenu}>
                  <IconBox>
                    <Span fontWeight="700">분석하기</Span>
                    <BsFillArrowRightCircleFill />
                  </IconBox>
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
              </PageLink>{" "}
            </MobileMenu>
            <MobileMenuShadow></MobileMenuShadow>
          </MobileMenuBox>
        ) : null}
      </MenuBox>
    </Container>
  );
};

export default NavBar;
