import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Img from "../atoms/Img";
import { useSelector } from "react-redux";
import { AnalyzedMessage } from "../../@types/index.d";

const Wrap = styled.div`
  width: 100%;
  position: fixed;
  z-index: 999;
  background-color: ${(props) => props.theme.mainWhite};
  border-bottom: 1px solid ${(props) => props.theme.backgroundGrey};
`;
const Container = styled.div`
  margin: 0 auto;
  width: 1200px;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  line-height: 80px;
`;

const H1 = styled.h1`
  height: 40px;
`;
const Menu = styled.div`
  display: flex;
  font-size: 22px;

  > * {
    margin-left: 100px;
  }
`;

const DarkModeButton = styled.div`
  cursor: pointer;

  &.active {
    color: #fff;
    background: #000;
  }
`;

interface NavBarProps {
  setIsDarkMode: () => void;
  isDarkMode: boolean;
}

const NavBar = ({ setIsDarkMode, isDarkMode }: NavBarProps) => {
  const isAnalyzedMessagesExist = useSelector(
    (state: { isAnalyzedMessagesExistSlice: boolean }) => state.isAnalyzedMessagesExistSlice
  );
  return (
    <Wrap>
      <Container>
        <H1>
          <Link to="/">
            <Img src={`${process.env.PUBLIC_URL}/images/logoBlack.png`} />
          </Link>
        </H1>
        <Menu>
          <Link to="/2">분석하기</Link>
          {isAnalyzedMessagesExist && <Link to="/dashboard">결과화면</Link>}
          <DarkModeButton className={`${isDarkMode && "active"}`} onClick={setIsDarkMode}>
            다크모드
          </DarkModeButton>
        </Menu>
      </Container>
    </Wrap>
  );
};

export default NavBar;
