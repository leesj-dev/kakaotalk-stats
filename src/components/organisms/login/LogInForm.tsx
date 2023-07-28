import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FlexRowDiv } from "../../atoms/FlexDiv";
import { UserData } from "./WithdrawButton";

const FormWrapper = styled.div`
  padding: 2rem;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--userPageBackground);
`;

const FormContainer = styled.div`
  width: 400px;
`;

const FormTitle = styled.h2`
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2rem;
`;

const FormGroup = styled.form`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  margin-bottom: 5px;
  display: block;
  font-size: 1.7rem;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 1rem;
  width: 100%;
  border-radius: 3px;
  border: 1px solid #ebebeb;
  font-size: 1.3rem;
`;

const AutoLoginBox = styled(FlexRowDiv)`
  margin-bottom: 5px;
  gap: 5px;
  > * {
    width: auto;
  }
  label {
    position: relative;
    top: 0.5px;
    font-size: 1.2rem;
  }
`;

const ErrorText = styled.div`
  margin-bottom: 10px;
  color: var(--mainRed);
`;

const Button = styled.button`
  padding: 1rem;
  width: 100%;
  background: var(--mainBlue);
  color: #fff;
  border: none;
  border-radius: 3px;
  font-size: 1.7rem;
  cursor: pointer;

  &:hover {
    background: var(--mainBlueHover);
  }
`;

const SignUpBox = styled.div`
  font-size: 1.3rem;
  text-align: center;
`;

const SignUpButton = styled.span`
  margin-left: 5px;
  font-weight: 700;
  border-bottom: 1px solid var(--mainText);
`;

interface accessTokenProps {
  userData: UserData | null;
  setUserData: (userData: UserData | null) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
}

const LogInForm = ({ userData, setUserData, accessToken, setAccessToken }: accessTokenProps) => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberMe, setIsRememberMe] = useState<boolean>(false);
  // 유효성 검사 메세지
  const [errMessage, setErrMessage] = useState("");

  const handleClickRememberMe = () => {
    setIsRememberMe(!isRememberMe);
  };

  // 로그인 유효성
  const loginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userId === "" || password === "") {
      setErrMessage("아이디 또는 비밀번호를 입력해주세요");
      return;
    }
    logInTest(e);
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
      console.log(userId + "님의 로그인이 완료되었습니다.");
      navigate("/");
      return console.log(result);
    } catch (error) {
      console.error(error);
      setErrMessage("아이디 또는 비밀번호를 확인해주세요");
    }
  };

  // const protectedUrlTest = async (e: any) => {
  //   e.preventDefault();
  //   try {
  //     const result = await axios.post("/api/protected/edit", null, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     console.log(result);
  //     setAccessToken(result.data.accessToken);
  //     setUserData(result.data);
  //     console.log(userData?.userId + "님의 제한 페이지 접근이 완료되었습니다.");
  //     return console.log(result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <FormWrapper>
      <FormContainer>
        <FormTitle>로그인</FormTitle>
        <FormGroup onSubmit={loginSubmit}>
          <Input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="아이디"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />{" "}
          <AutoLoginBox>
            <Input
              type="checkbox"
              id="remember"
              checked={isRememberMe}
              onChange={() => handleClickRememberMe()}
            />
            <Label>로그인 상태 유지</Label>
          </AutoLoginBox>
          <ErrorText>{errMessage}</ErrorText>
          <Button type="submit">로그인</Button>
        </FormGroup>
        <SignUpBox>
          이미 회원정보가 있으신가요?
          <SignUpButton>
            <Link to="/join">회원가입</Link>
          </SignUpButton>
        </SignUpBox>
        {/* <Button onClick={(e) => protectedUrlTest(e)}>토큰 테스트</Button> */}
      </FormContainer>
    </FormWrapper>
  );
};

export default LogInForm;
