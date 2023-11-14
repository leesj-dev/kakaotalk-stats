import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Img from "../../atoms/Img";
import { useDispatch, useSelector } from "react-redux";
import { setIsDarkMode } from "../../../store/reducer/common/isDarkModeSlice";
import { HiMenu } from "react-icons/hi";
import Icon from "../../atoms/Icon";
import { NavProps } from "../../sections/navigation/Navigation";
import { setIsModalVisible } from "../../../store/reducer/dashboard/isModalVisibleSlice";
import DarkModeButton from "../../molecules/navigation/DarkModeButton";
import { UserData } from "../../../@types/index.d";
import NavMenus from "../../molecules/navigation/NavMenus";

const NavHeadContainer = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1240px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  line-height: 8rem;
`;

const H1 = styled.h1`
  display: flex;
  align-items: center;
  height: 40px;
  width: 120px;
  &.active {
    transform: translateY(-22px);
  }
  @media (max-width: 1200px) {
    justify-content: center;
  }
`;

const MobileMenuButton = styled.div`
  display: none;

  @media (max-width: 1200px) {
    display: flex;
    transform: translateY(4px);
  }
`;

const MobileMenuIcon = styled(Icon)`
  font-size: 3rem;
  cursor: pointer;
`;

interface NavHeadProps extends NavProps {}

const NavHead: React.FC<NavHeadProps> = ({ closeMenu, isDarkMode, isAnalyzedMessagesExist }) => {
  const dispatch = useDispatch();

  const debounceTimeoutRef = useRef<number | null>(null);

  const [theme, setTheme] = useState("light");

  const switchTheme = "light" === theme ? "dark" : "light";

  const handleClickDarkModeButton = () => {
    if (debounceTimeoutRef.current === null) {
      setTheme(switchTheme);
      dispatch(setIsDarkMode(!isDarkMode));

      debounceTimeoutRef.current = window.setTimeout(() => {
        debounceTimeoutRef.current = null;
      }, 300);
    }
  };

  const handleClickMenu = () => {
    dispatch(setIsModalVisible(false));
    closeMenu();
  };

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <NavHeadContainer>
      <MobileMenuButton>
        <MobileMenuIcon onClick={handleClickMenu}>
          <HiMenu />
        </MobileMenuIcon>
      </MobileMenuButton>
      <H1>
        <Link to="/">
          <Img
            src={[
              `${process.env.PUBLIC_URL}/images/logo/logoBlack.png`,
              `${process.env.PUBLIC_URL}/images/logo/logoGray.png`,
            ]}
          />
        </Link>
      </H1>
      <NavMenus isAnalyzedMessagesExist={isAnalyzedMessagesExist} />
      <DarkModeButton isDarkMode={isDarkMode} handleClickDarkModeButton={handleClickDarkModeButton} />
    </NavHeadContainer>
  );
};

export default NavHead;
