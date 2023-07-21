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

interface accessTokenProps {
  userData: string;
  setUserData: (accessToken: string) => void;
}

const UserPage = ({ userData, setUserData }: accessTokenProps) => {
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <UserPageContainer>
      {userData ? (
        <LogOutButton userData={userData} setUserData={setUserData} />
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
