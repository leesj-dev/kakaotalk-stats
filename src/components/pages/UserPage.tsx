import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SignUpForm from "../organisms/login/SignUpForm";
import LogInForm from "../organisms/login/LogInForm";

const UserPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  height: 70vh;
`;

const UserPage = () => {
  const [accessToken, setAccessToken] = useState<string>("");

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAccessToken("");
  };

  useEffect(() => {
    const accessToken = document.cookie.split("accessToken=")[1];
    setAccessToken(accessToken);
  }, []);

  useEffect(() => {}, [accessToken]);

  return (
    <UserPageContainer>
      {accessToken ? (
        <div style={{ fontSize: "2rem", padding: "1rem" }}>
          <button onClick={(e) => handleLogout(e)}>로그아웃</button>
        </div>
      ) : (
        <>
          <SignUpForm />
          <LogInForm />
        </>
      )}
    </UserPageContainer>
  );
};

export default UserPage;
