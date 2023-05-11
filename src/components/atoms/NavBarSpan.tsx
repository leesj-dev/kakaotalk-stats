import styled from "styled-components";

const NavBar = styled.div<{ fontSize?: string }>`
  line-height: 80px;
  font-size: ${(props) => props.fontSize};
`;

const NavBarSpan = ({ li }: { li: string }) => {
  return <NavBar fontSize="20px">{li}</NavBar>;
};

export default NavBarSpan;
