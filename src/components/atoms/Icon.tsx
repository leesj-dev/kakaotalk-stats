import styled from "styled-components";

import React, { ReactNode } from "react";

const I = styled.i``;

interface IconProps {
  children: ReactNode;
}

const Icon: React.FC<IconProps> = ({ children }) => {
  return <I>{children}</I>;
};
export default Icon;
