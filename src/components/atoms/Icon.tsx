import React, { ReactNode } from "react";
import styled from "styled-components";

const I = styled.i<{ fontSize?: string }>`
  font-size: ${(props) => props.fontSize || "16px"};
`;

interface IconProps {
  children: ReactNode;
  fontSize?: string;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ children, fontSize, onClick }) => {
  return (
    <I fontSize={fontSize} onClick={onClick}>
      {children}
    </I>
  );
};

export default Icon;
