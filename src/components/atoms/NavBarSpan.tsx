import styled from "styled-components";

const NavBar = styled.div`
  font-size: 21px;
  color: #333;
`;

const NavBarSpan = ({ li }: { li: string }) => {
  return <NavBar>{li}</NavBar>;
};

export default NavBarSpan;
