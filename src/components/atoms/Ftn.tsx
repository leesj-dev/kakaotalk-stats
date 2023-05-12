import React, { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import styled from "styled-components";

interface IconProps {
  className?: string;
  size?: number;
}

const Container = styled.div`
  position: relative;
  width: 1200px;
`;

const I = styled.i`
  position: fixed;
  bottom: 30px;
  right: 30px;
  font-size: 20px;
  padding: 10px;
  border-radius: 20%;
  background-color: ${(props) => props.theme.mainBlack};
  color: ${(props) => props.theme.mainWhite};
`;

const Ftn: React.FC<IconProps> = () => {
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
    <Container>
      {showFloatingButton ? (
        <I onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <FiArrowUp />
        </I>
      ) : (
        ""
      )}
    </Container>
  );
};

export default Ftn;
