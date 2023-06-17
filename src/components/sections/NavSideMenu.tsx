import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Img from "../atoms/Img";
import { useSelector } from "react-redux";
import { HiMenu } from "react-icons/hi";
import Icon from "../atoms/Icon";
import DashboardSideMenu from "./DashboardSideMenu";

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

const NavBar = () => {
  const isAnalyzedMessagesExist = useSelector(
    (state: { isAnalyzedMessagesExistSlice: boolean }) => state.isAnalyzedMessagesExistSlice
  );
  const isDarkMode = useSelector((state: { isDarkModeSlice: boolean }) => state.isDarkModeSlice);

  const closeMenu = () => {
    setMenu(!isOpen);
  };
  const [isOpen, setMenu] = useState(false);

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
