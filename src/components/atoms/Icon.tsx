import React, { ReactNode } from "react";
import styled from "styled-components";

const Icon = styled.i<{ fontSize?: string; color?: string; cursor?: string; fontWeight?: string }>`
  font-size: ${(props) => props.fontSize || "16px"};
  color: ${(props) => props.color || "mainText"};
  cursor: ${(props) => props.cursor && "pointer"};
  font-weight: ${(props) => props.fontWeight || "300"};
`;

// interface IconProps {
//   children: ReactNode;
//   fontSize?: string;
//   fontWeight?: string;
//   color?: string;
//   cursor?: string;

//   direction?: "next" | "prev";
// }

// const Icon: React.FC<IconProps> = ({
//   children,
//   fontSize,
//   color,

//   cursor,
//   direction,
//   fontWeight,
// }) => {
//   return (
//     <I fontSize={fontSize} color={color} cursor={cursor} fontWeight={fontWeight}>
//       {children}
//     </I>
//   );
// };

export default Icon;
