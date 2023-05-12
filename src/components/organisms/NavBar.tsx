import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Img from "../atoms/Img";

const Wrap = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.mainGrey};
`;
const Container = styled.div`
  margin: 0 auto;
  width: 1200px;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
`;

const H1 = styled.h1``;

const NavBar = () => {
  return (
    <Wrap>
      <Container>
        <H1>
          <Img src="" />
        </H1>
        <Link to="/">카카오돋보기</Link>
        <Link to="/2">분석하기</Link>
        {/* <NavBarSpan li="카카오돋보기" />
        <NavBarSpan li="분석하기" />
        <NavBarSpan li="다크모드" /> */}
      </Container>
    </Wrap>
  );
};

export default NavBar;
