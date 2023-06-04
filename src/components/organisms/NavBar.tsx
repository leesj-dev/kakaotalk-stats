import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Img from "../atoms/Img";
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../../style/Theme";
import { setIsDarkMode } from "../../store/reducer/isDarkModeSlice";
import Icon from "../atoms/Icon";
import { BsFillBrightnessHighFill, BsFillMoonStarsFill } from "react-icons/bs";

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
  align-items: center;
  font-size: 22px;

  > * {
    margin-left: 100px;
  }
`;

const DarkModeButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 5px;
  width: 80px;
  height: 40px;
  background: #222;
  border-radius: 25px;
  cursor: pointer;
  > * {
    color: ${lightTheme.mainBackground};
    background: ${darkTheme.mainBackground};
  }

  &.active {
    color: ${(props) => props.theme.mainText};
    background: ${(props) => props.theme.mainText};
    justify-content: end;

    > * {
      color: ${darkTheme.mainBackground};
      background: ${lightTheme.mainBackground};
    }
    > :nth-child(1) {
      left: 50%;
      background: ${darkTheme.mainBackground};
    }
  }
`;

const ToggleCircle = styled.div`
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 5px;
  width: calc(50% - 5px);
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
            <Img src={`${process.env.PUBLIC_URL}/images/${isDarkMode ? "logoGray" : "logoBlack"}.png`} />
          </Link>
        </H1>
        <Menu>
          <Link to="/2">분석하기</Link>
          {isAnalyzedMessagesExist && <Link to="/dashboard">결과화면</Link>}
          <DarkModeButton className={`${isDarkMode && "active"}`} onClick={handleClickDarkModeButton}>
            <ToggleCircle></ToggleCircle>
            <IconBox>
              <BsFillBrightnessHighFill />
              <BsFillMoonStarsFill />
            </IconBox>
          </DarkModeButton>
        </Menu>
      </Container>
    </Wrap>
  );
};

export default NavBar;
