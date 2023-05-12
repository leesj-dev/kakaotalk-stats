import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Img from "../atoms/Img";

const Wrap = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.backgroundGrey};
`;
const Container = styled.div`
  margin: 0 auto;
  width: 1200px;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  line-height: 80px;
`;

const H1 = styled.h1`
  height: 40px;
`;
const Menu = styled.div`
  font-size: 22px;
  > * {
    margin-left: 100px;
  }
`;

const NavBar = () => {
  return (
    <Wrap>
      <Container>
        <H1>
          <Link to="/">
            <Img src={`${process.env.PUBLIC_URL}/images/logoBlack.png`} />
          </Link>
        </H1>
        <Menu>
          <Link to="/2">분석하기</Link>
          <Link to="/">다크모드</Link>
        </Menu>
      </Container>
    </Wrap>
  );
};

export default NavBar;
