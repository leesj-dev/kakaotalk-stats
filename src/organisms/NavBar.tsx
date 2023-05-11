import React from "react";
import styled from "styled-components";
import NavBarSpan from "../components/atoms/NavBarSpan";

const Container = styled.div`
  padding: 80px 0;
  width: 1200px;
  display:flex
  justify-contnet: center;
  display: flex;
`;
const NavBar = () => {
  return (
    <Container>
      <NavBarSpan li="카카오돋보기" />
      <NavBarSpan li="분석하기" />
      <NavBarSpan li="다크모드" />
    </Container>
  );
};

export default NavBar;
