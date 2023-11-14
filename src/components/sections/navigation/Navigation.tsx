import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setIsSideMenuChatRoom } from "../../../store/reducer/dashboard/isSideMenuChatRoomSelectSlice";
import NavHead from "../../organisms/navigation/NavHead";
import NavSideMenu from "../../organisms/navigation/NavSide";
import { zIndex } from "../../../style/specifiedCss/zIndex";

const NavigationContainer = styled.div<{ isDarkMode: boolean }>`
  position: fixed;
  top: 0;
  width: 100%;
  box-shadow: ${(props) => (props.isDarkMode ? "none" : `0 1px 1px 0px var(--border)`)};
  z-index: ${zIndex.navigationContainer};
  user-select: none;
  background: var(--navBackground);
  transition: background 0.3s, box-shadow 0.3s;
`;

export interface NavProps {
  closeMenu: () => void;
  isDarkMode: boolean;
  isAnalyzedMessagesExist: boolean;
  isWideScreen?: boolean;
}

const Navigation = () => {
  const dispatch = useDispatch();

  const isAnalyzedMessagesExist = useSelector(
    (state: { isAnalyzedMessagesExistSlice: boolean }) => state.isAnalyzedMessagesExistSlice
  );
  const isSideMenuChatRoom = useSelector(
    (state: { isSideMenuChatRoomSelectSlice: boolean }) => state.isSideMenuChatRoomSelectSlice
  );
  const isDarkMode = useSelector((state: { isDarkModeSlice: boolean }) => state.isDarkModeSlice);

  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1200);

  const closeMenu = () => {
    dispatch(setIsSideMenuChatRoom(!isSideMenuChatRoom));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 1200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navHeadProps = {
    closeMenu,
    isDarkMode,
    isAnalyzedMessagesExist,
  };

  const navSideProps = {
    ...navHeadProps,
    isWideScreen,
  };

  return (
    <NavigationContainer isDarkMode={isDarkMode}>
      <NavHead {...navHeadProps} />
      <NavSideMenu {...navSideProps} />
    </NavigationContainer>
  );
};

export default Navigation;
