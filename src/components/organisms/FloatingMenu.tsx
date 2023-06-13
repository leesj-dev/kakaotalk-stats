import React, { useEffect, useState } from "react";
import styled from "styled-components";
import scrollToEvent from "../../module/common/scrollEvent";
import Icon from "../atoms/Icon";
import { FiArrowUp } from "react-icons/fi";
import { BsShareFill } from "react-icons/bs";

const FloatingMenuContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #fff;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
  z-index: 900;

  &.show {
    opacity: 1;
    visibility: visible;
  }
  > * {
    padding: 10px;
    transition: 0.3s;
    background: ${(props) => props.theme.mainBlue};
    border-radius: 25%;
    cursor: pointer;

    &:hover {
      background: ${(props) => props.theme.mainBlueHover};
    }
  }
`;

const ScrollToTopButtonBox = styled.div``;

const ShareButtonBox = styled.div``;

const FloatingMenu = () => {
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShowFloatingButton(true);
    } else {
      setShowFloatingButton(false);
    }
  };

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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <FloatingMenuContainer className={`${showFloatingButton && "show"}`}>
      <ShareButtonBox onClick={() => handleClickCShareButton()}>
        <Icon fontSize="24px">
          <BsShareFill />
        </Icon>
      </ShareButtonBox>
      <ScrollToTopButtonBox onClick={() => scrollToEvent(0, "smooth")}>
        <Icon fontSize="24px">
          <FiArrowUp />
        </Icon>
      </ScrollToTopButtonBox>
    </FloatingMenuContainer>
  );
};

export default FloatingMenu;
