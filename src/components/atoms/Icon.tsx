import styled from "styled-components";

interface IconProps {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
}

const Icon = styled.i<IconProps>`
  font-size: ${(props) => props.fontSize || "16px"};
  color: ${(props) => props.color || "mainText"};
  font-weight: ${(props) => props.fontWeight || "300"};
`;

export default Icon;
