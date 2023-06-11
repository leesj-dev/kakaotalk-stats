import { ReactNode } from "react";
import styled, { css } from "styled-components";

const RadiusButtonStyle = styled.button`
  margin: 0 auto;
  padding: 20px 40px;
  display: flex;
  justify-content: center;
  text-align: center;
  width: 200px;
  font-weight: 500;
  letter-spacing: 0.05rem;
  color: #fff;
  background: ${(props) => props.theme.mainBlue};
  border-radius: 30px;
  transition: 0.3s;
  border: none;
  cursor: pointer;
  @media (max-width: 480px) {
    width: 170px;
    font-size: 12px;
  }
  &:hover {
    background: ${(props) => props.theme.mainBlueHover};
  }

  ${(props) =>
    props.disabled &&
    css`
      background: ${props.theme.mainGray};
      cursor: not-allowed;

      &:hover {
        background: ${(props) => props.theme.mainBlack};
      }
    `}
`;

interface RadiusButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  // 필요한 다른 속성 추가
}

const RadiusButton: React.FC<RadiusButtonProps> = ({ onClick, disabled = false, children }) => {
  return (
    <RadiusButtonStyle onClick={onClick} disabled={disabled}>
      {children}
    </RadiusButtonStyle>
  );
};

export default RadiusButton;
