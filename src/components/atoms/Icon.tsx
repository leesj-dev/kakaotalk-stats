import React, { ReactNode } from "react";
import styled from "styled-components";

const I = styled.i<{ fontSize?: string; color?: string; cursor?: string }>`
  font-size: ${(props) => props.fontSize || "16px"};
  color: ${(props) => props.color || props.theme.mainText};
  cursor: ${(props) => props.cursor && "pointer"};
`;

interface IconProps {
  children: ReactNode;
  fontSize?: string;
  color?: string;
  cursor?: string;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ children, fontSize, color, onClick, cursor }) => {
  return (
    <I fontSize={fontSize} color={color} onClick={onClick} cursor={cursor}>
      {children}
    </I>
  );
};

export default Icon;
