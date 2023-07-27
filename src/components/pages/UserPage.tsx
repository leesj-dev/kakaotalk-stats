import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SignUpForm from "../organisms/login/SignUpForm";
import LogInForm from "../organisms/login/LogInForm";
import LogOutButton from "../organisms/login/LogOutButton";
import WithdrawButton, { UserData } from "../organisms/login/WithdrawButton";

const UserPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  height: 70vh;
`;

interface accessTokenProps {
  userData: UserData | null;
  setUserData: (userData: UserData | null) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
}

const UserPage = ({ userData, setUserData, accessToken, setAccessToken }: accessTokenProps) => {
  useEffect(() => {
    // 로그인 된 유저 데이터 확인용
    console.log(userData);
  }, [userData]);

  return (
    <UserPageContainer>
      <LogInForm
        userData={userData}
        setUserData={setUserData}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
      />

      {/* <WithdrawButton userData={userData} setUserData={setUserData} accessToken={accessToken} /> */}
    </UserPageContainer>
  );
};

export default UserPage;
