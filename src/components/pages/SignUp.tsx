import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SignUpForm from "../organisms/login/SignUpForm";

const SigUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  height: 70vh;
`;

const SignUp = () => {
  return (
    <SigUpContainer>
      <SignUpForm />
  
    </SigUpContainer>
  );
};

export default SignUp;
