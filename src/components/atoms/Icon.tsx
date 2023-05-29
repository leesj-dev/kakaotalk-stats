import React, { ReactNode } from "react";
import styled from "styled-components";

const I = styled.i<{ fontSize?: string; color?: string }>`
  font-size: ${(props) => props.fontSize || "16px"};
`;

interface IconProps {
  children: ReactNode;
  fontSize?: string;
  color?: string;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ children, fontSize, color, onClick }) => {
  return (
    <I fontSize={fontSize} color={color} onClick={onClick}>
      {children}
    </I>
  );
};

export default Icon;
