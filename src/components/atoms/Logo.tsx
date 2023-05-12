import React from "react";
import styled from "styled-components";

const Img = styled.div`
  margin-bottom: 30px;
  width: 300px;
`;

const Logo = () => {
  return (
    <Img>
      <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="/" />
    </Img>
  );
};

export default Logo;
