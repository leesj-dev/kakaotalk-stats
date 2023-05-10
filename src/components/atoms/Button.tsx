import styled from "styled-components";

const RadiusButton = styled.div`
  margin: 0 auto;
  padding: 20px 40px;
  display: flex;
  justify-content: center;
  text-align: center;
  width: 200px;
  font-weight: 500;
  letter-spacing: 0.05rem;
  color: ${(props) => props.theme.mainWhite};
  background: ${(props) => props.theme.mainBlue};
  border-radius: 30px;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.mainBlueHover};
  }
`;

export default RadiusButton;
