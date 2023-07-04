import React from "react";
import styled, { keyframes } from "styled-components";

const LoadingBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: #00000080;
  z-index: 1000;
  font-size: 0;
  line-height: 0;
`;

const loaderAnimation = keyframes`
    0% {
        transform:translateX(-50%) translateY(-50%) rotate(0deg) ;
    }
    50% {
        transform:translateX(-50%) translateY(-50%) rotate(180deg) ;
    }
    100% {
        transform:translateX(-50%) translateY(-50%) rotate(180deg) ;
    }
`;

const Loader = styled.div`
  position: absolute;
  top: calc(50% - 12px);
  left: calc(50% - 12px);
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background-color: #fff;
  animation: ${loaderAnimation} 1s ease-in-out infinite;

  &:before,
  :after {
    content: "";
    position: absolute;
    background-color: rgba(255, 255, 255, 0.7);
    top: 0px;
    left: -25px;
    height: 12px;
    width: 12px;
    border-radius: 12px;
  }
  &:after {
    left: 25px;
  }
`;

const Loading = () => {
  return (
    <LoadingBox>
      <Loader />
    </LoadingBox>
  );
};

export default Loading;
