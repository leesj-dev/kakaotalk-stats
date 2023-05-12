import { ReactNode } from "react";
import styled from "styled-components";

const StyledFlexCenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

interface FlexCenterDivProps {
  children: ReactNode;
}

const FlexCenterDiv = ({ children, ...rest }: FlexCenterDivProps) => {
  return <StyledFlexCenterDiv {...rest}>{children}</StyledFlexCenterDiv>;
};

export default FlexCenterDiv;
