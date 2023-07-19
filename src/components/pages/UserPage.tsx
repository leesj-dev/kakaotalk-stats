import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import SignUpForm from "../organisms/login/SignUpForm";
import SignInForm from "../organisms/login/SignInForm";

const UserPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  height: 70vh;
`;

const UserPage = () => {
  const [nickname, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <UserPageContainer>
      <SignUpForm />
      <SignInForm />
    </UserPageContainer>
  );
};

export default UserPage;
