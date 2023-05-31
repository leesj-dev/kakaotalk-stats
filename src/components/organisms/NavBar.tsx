import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Img from "../atoms/Img";
import { useDispatch, useSelector } from "react-redux";
import { darkTheme } from "../../style/Theme";
import { setIsDarkMode } from "../../store/reducer/isDarkModeSlice";

const Wrap = styled.div`
  width: 100%;
  position: fixed;
  z-index: 999;
  color: ${(props) => props.theme.mainText};
  background-color: ${(props) => props.theme.navBackground};
  border-bottom: ${(props) => (props.theme === darkTheme ? "none" : `1px solid ${props.theme.border}`)};
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
    color: ${(props) => props.theme.mainText};
    background: ${(props) => props.theme.navBackground};
  }
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
          <DarkModeButton className={`${isDarkMode && "active"}`} onClick={handleClickDarkModeButton}>
            다크모드
          </DarkModeButton>
        </Menu>
      </Container>
    </Wrap>
  );
};

export default NavBar;
