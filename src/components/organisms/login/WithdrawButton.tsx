import axios from "axios";
import React from "react";
import styled from "styled-components";
import { UserData } from "../../../@types/index.d";

const WithdrawContainer = styled.div`
  padding: 2rem;
  background: #f2f2f2;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  font-size: 2rem;
  background: #4caf50;
  color: white;
  border-radius: 3px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #26942a;
  }
`;

interface WithdrawProps {
  userData: UserData | null;
  accessToken: string;
  setUserData: (userData: UserData | null) => void;
}

const WithdrawButton = ({ userData, setUserData, accessToken }: WithdrawProps) => {
  const handleClickWithdrawButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (userData) {
        const result = await axios.delete(`/api/protected/users/${userData.userId}/withdraw`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserData(null);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <WithdrawContainer>
      <Button onClick={(e) => handleClickWithdrawButton(e)}>회원 탈퇴하기</Button>
    </WithdrawContainer>
  );
};

export default WithdrawButton;
