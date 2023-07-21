import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SignUpForm from "../organisms/login/SignUpForm";
import LogInForm from "../organisms/login/LogInForm";
import LogOutButton from "../organisms/login/LogOutButton";

const UserPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  height: 70vh;
`;

const UserPage = () => {
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const accessToken = document.cookie.split("accessToken=")[1];
    console.log(document.cookie);
    setAccessToken(accessToken);
  }, []);

  useEffect(() => {}, [accessToken]);

  return (
    <UserPageContainer>
      {accessToken ? (
        <LogOutButton accessToken={accessToken} setAccessToken={setAccessToken} />
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
