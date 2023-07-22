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
  setUserData: (accessToken: UserData | null) => void;
}

const UserPage = ({ userData, setUserData }: accessTokenProps) => {
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <UserPageContainer>
      {/* {userData ? ( */}
      {/* <> */}

      {/* </> */}
      {/* ) : ( */}
      {/* <> */}
      <SignUpForm />
      <LogInForm userData={userData} setUserData={setUserData} />
      <LogOutButton userData={userData} setUserData={setUserData} />
      <WithdrawButton userData={userData} setUserData={setUserData} />
      {/* </> */}
      {/* // )} */}
    </UserPageContainer>
  );
};

export default UserPage;
