import React, { useEffect, useState } from "react";
import styled from "styled-components";
import scrollToEvent from "../../../module/common/scrollToEvent";
import Icon from "../../atoms/Icon";
import { FiArrowUp } from "react-icons/fi";
import { BsShareFill } from "react-icons/bs";
import { lightTheme } from "../../../style/Theme";
import { FlexColumnDiv } from "../../atoms/FlexDiv";
import { borderRadius } from "../../../style/specifiedCss/borderRadius";
import { zIndex } from "../../../style/specifiedCss/zIndex";

const FloatingMenuContainer = styled(FlexColumnDiv)<{ isFloatingMenuVisible?: boolean }>`
  position: fixed;
  bottom: 30px;
  right: 30px;
  gap: 10px;
  background: none;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
  opacity: ${({ isFloatingMenuVisible }) => (isFloatingMenuVisible ? 1 : 0)};
  visibility: ${({ isFloatingMenuVisible }) => (isFloatingMenuVisible ? "visible" : "hidden")};
  z-index: ${zIndex.floatingMenu};

  > * {
    padding: 10px;
    border-radius: ${borderRadius.medium};
    font-size: 24px;
    color: ${lightTheme.mainWhite};
    background: var(--mainBlue);
    transition: background 0.3s;
    cursor: pointer;

    &:hover {
      background: var(--mainBlueHover);
    }
  }
`;

const FloatingMenuItem = styled(Icon)``;

const copyClipBoard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    alert("클립보드에 주소가 복사되었어요.");
  } catch (err) {
    console.log(err);
  }
};

const handleClickCShareButton = () => {
  const url = "쥬희무쩅이넹~ㅇㅅㅇ~";
  copyClipBoard(url);
};

const menuItems = [
  {
    onClick: () => handleClickCShareButton(),
    icon: <BsShareFill />,
  },
  {
    onClick: () => scrollToEvent(0, "smooth"),
    icon: <FiArrowUp />,
  },
];

const FloatingMenu = () => {
  const [isFloatingMenuVisible, setIsFloatingMenuVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsFloatingMenuVisible(true);
    } else {
      setIsFloatingMenuVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <FloatingMenuContainer isFloatingMenuVisible={isFloatingMenuVisible}>
      {menuItems.map((menuItem, index) => (
        <FloatingMenuItem key={index} onClick={menuItem.onClick}>
          {menuItem.icon}
        </FloatingMenuItem>
      ))}
    </FloatingMenuContainer>
  );
};

export default FloatingMenu;
