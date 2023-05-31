import React from "react";
import styled from "styled-components";

const AnchorComponent = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 5px;

  &:hover {
    > * {
      transition: 0.3s;
      color: ${(props) => props.theme.mainBlue};
    }
  }
`;

interface SpanProps {
  children: React.ReactNode;
  href: string;
}

const Anchor = ({ children, href }: SpanProps) => {
  return (
    <AnchorComponent href={href} target="_blank">
      {children}
    </AnchorComponent>
  );
};

export default Anchor;
