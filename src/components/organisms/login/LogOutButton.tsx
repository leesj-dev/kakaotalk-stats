import axios from "axios";
import React from "react";
import styled from "styled-components";

const LogOutContainer = styled.div``;

const Button = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  border-radius: 3px;
  background-color: #4caf50;
  color: white;
  border: none;
`;

interface LogOutButtonProps {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
}

const LogOutButton = ({ accessToken, setAccessToken }: LogOutButtonProps) => {
  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const result = await axios.post("/api/protected/users/signout", null);
      setAccessToken("");
      return console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <LogOutContainer style={{ fontSize: "2rem", padding: "1rem" }}>
      <Button onClick={(e) => handleLogout(e)}>로그아웃</Button>
    </LogOutContainer>
  );
};

export default LogOutButton;
