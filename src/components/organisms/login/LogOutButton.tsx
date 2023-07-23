import axios from "axios";
import React from "react";
import styled from "styled-components";
import { UserData } from "./WithdrawButton";

const LogOutContainer = styled.div`
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

interface LogOutButtonProps {
  userData: UserData | null;
  setUserData: (userData: UserData | null) => void;
  accessToken: string;
}

const LogOutButton = ({ userData, setUserData, accessToken }: LogOutButtonProps) => {
  const handleClickLogoutButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "/api/protected/users/signout",
        { accessToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setUserData(null);
      return console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <LogOutContainer>
      <Button onClick={(e) => handleClickLogoutButton(e)}>로그아웃</Button>
    </LogOutContainer>
  );
};

export default LogOutButton;
