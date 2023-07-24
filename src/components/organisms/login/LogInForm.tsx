import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getTokenFromCookie } from "../../../module/common/getTokenFromCookie";
import { FlexRowDiv } from "../../atoms/FlexDiv";
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
const ErrorText = styled.span`
  color: #f00;
`;

const Button = styled.button`
  padding: 10px;
  width: 100%;
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

const SignUpBox = styled.div`
  text-align: center;
`;

const SignUpButton = styled.span`
  margin-left: 5px;
  font-weight: 700;
  border-bottom: 1px solid #000;
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
  // 유효성 검사 메세지
  const [errMessege, setErrMessege] = useState(false);

  const handleClickRememberMe = () => {
    setIsRememberMe(!isRememberMe);
  };

  // 로그인 유효성
  const loginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 유효성 검사
    if (userId === "" || password === "") {
      setErrMessege(true);
      return;
    }
  };

  const logInTest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await axios.post("/api/users/login", {
        userId,
        password,
        isRememberMe,
      });

      console.log(result.data, "result.data");
      const accessToken = getTokenFromCookie(document.cookie);
      setAccessToken(accessToken);
      setUserData(result.data.data);
      return console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const protectedUrlTest = async (e: any) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "/api/protected/edit",
        { accessToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

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
        <ErrorText>{errMessege}</ErrorText>

        <Button type="submit">로그인</Button>
      </FormGroup>
      <SignUpBox>
        이미 회원정보가 있으신가요?
        <SignUpButton>
          <Link to="/join">회원가입</Link>
        </SignUpButton>
      </SignUpBox>
      <Button onClick={(e) => protectedUrlTest(e)}>토큰 테스트</Button>
    </FormContainer>
  );
};

export default LogInForm;
