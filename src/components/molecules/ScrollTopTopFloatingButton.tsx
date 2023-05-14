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
  font-size: 20px;
  color: ${(props) => props.theme.mainWhite};
  background-color: ${(props) => props.theme.mainBlack};
  border-radius: 20%;
  cursor: pointer;
`;

const ScrollTopTopFloatingButton: React.FC<IconProps> = () => {
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
    <>
      {showFloatingButton && (
        <FloatingButtonBox onClick={() => scrollToEvent(0, "smooth")}>
          <Icon>
            <FiArrowUp />
          </Icon>
        </FloatingButtonBox>
      )}
    </>
  );
};

export default ScrollTopTopFloatingButton;
