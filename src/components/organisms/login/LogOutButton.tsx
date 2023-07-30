import axios from "axios";
import React from "react";
import styled from "styled-components";
import { UserData } from "./WithdrawButton";

const LogOutContainer = styled.div``;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
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
      await axios.post("/api/protected/users/signout", null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
    setUserData(null);
    console.log(userData?.userId + "님의 로그아웃이 완료되었습니다.");
  };
  return (
    <LogOutContainer>
      <Button onClick={(e) => handleClickLogoutButton(e)}>로그아웃</Button>
    </LogOutContainer>
  );
};

export default LogOutButton;
