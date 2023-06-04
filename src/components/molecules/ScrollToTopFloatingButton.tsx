import React, { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import styled from "styled-components";
import Icon from "../atoms/Icon";
import scrollToEvent from "../../module/common/scrollEvent";

interface IconProps {
  className?: string;
  size?: number;
}

const FloatingButtonBox = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 10px;
  color: #fff;
  background-color: ${(props) => props.theme.mainBlue};
  border-radius: 20%;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
  cursor: pointer;
  z-index: 1000;

  &:hover {
    background: ${(props) => props.theme.mainBlueHover};
  }

  &.show {
    opacity: 1;
    visibility: visible;
  }
`;

const ScrollToTopFloatingButton: React.FC<IconProps> = () => {
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowFloatingButton(true);
      } else {
        setShowFloatingButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <FloatingButtonBox
      className={`${showFloatingButton && "show"}`}
      onClick={() => scrollToEvent(0, "smooth")}
    >
      <Icon fontSize="22px">
        <FiArrowUp />
      </Icon>
    </FloatingButtonBox>
  );
};

export default ScrollToTopFloatingButton;
