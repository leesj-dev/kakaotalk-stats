import React, { ReactNode } from "react";
import styled from "styled-components";

const I = styled.i``;

interface IconProps {
  children: ReactNode;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ children, onClick }) => {
  return <I onClick={onClick}>{children}</I>;
};

export default Icon;
