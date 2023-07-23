import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { getTokenFromCookie } from "../../../module/common/getTokenFromCookie";
import { UserData } from "./WithdrawButton";

const FormContainer = styled.div`
  background: #f2f2f2;
  padding: 20px;
  border-radius: 5px;
`;

const FormTitle = styled.h2`
  margin-bottom: 1rem;
  text-align: center;
  font-size: 2rem;
`;

const FormGroup = styled.form`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 1.7rem;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  width: 100%;
  padding: 8px;
  border-radius: 3px;
  border: 1px solid #ccc;
  font-size: 1.7rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 3px;
  font-size: 1.7rem;
  cursor: pointer;

  &:hover {
    background: #26942a;
  }
`;

interface accessTokenProps {
  userData: UserData | null;
  setUserData: (userData: UserData | null) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
}

const LogInForm = ({ userData, setUserData, accessToken, setAccessToken }: accessTokenProps) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberMe, setIsRememberMe] = useState<boolean>(false);

  const handleClickRememberMe = () => {
    setIsRememberMe(!isRememberMe);
  };

  const logInTest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await axios.post("/api/users/login", {
        userId,
        password,
        isRememberMe,
      });

      const { accessToken } = result.data;
      setAccessToken(accessToken);
      setUserData(result.data);
      return console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const protectedUrlTest = async (e: any) => {
    e.preventDefault();
    try {
      const result = await axios.post("/api/protected/edit", null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(result);
      setAccessToken(result.data.accessToken);
      setUserData(result.data);
      return console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormContainer>
      <FormTitle>로그인</FormTitle>
      <FormGroup onSubmit={(e) => logInTest(e)}>
        <Label>아이디</Label>
        <Input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <Label>비밀번호</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Label>자동 로그인</Label>
        <Input type="checkbox" checked={isRememberMe} onChange={() => handleClickRememberMe()} />
        <Button type="submit">로그인</Button>
      </FormGroup>
      <Button onClick={(e) => protectedUrlTest(e)}>토큰 테스트</Button>
    </FormContainer>
  );
};

export default LogInForm;
