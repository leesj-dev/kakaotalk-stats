import React from "react";
import styled from "styled-components";
import NavBarSpan from "../atoms/NavBarSpan";
const Wrap = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.mainGrey};
`;
const Container = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  display: flex;
  font-weight: 500;
`;
const NavBar = () => {
  return (
    <Wrap>
      <Container>
        <NavBarSpan li="카카오돋보기" />
        <NavBarSpan li="분석하기" />
        <NavBarSpan li="다크모드" />
      </Container>
    </Wrap>
  );
};

export default NavBar;
