import React from "react";
import { BsFillBrightnessHighFill, BsFillMoonStarsFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setIsDarkMode } from "../../store/reducer/isDarkModeSlice";
import { darkTheme, lightTheme } from "../../style/Theme";
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
    }
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
interface iconProps {
  icon: React.ReactNode;
}

const ModeButton: React.FC<iconProps> = ({ icon }) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: { isDarkModeSlice: boolean }) => state.isDarkModeSlice);
  const handleClickDarkModeButton = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return (
    <DarkModeButton className={`${isDarkMode && "active"}`} onClick={handleClickDarkModeButton}>
      <ToggleCircle></ToggleCircle>
      <IconBox>{icon}</IconBox>
    </DarkModeButton>
  );
};

export default ModeButton;
