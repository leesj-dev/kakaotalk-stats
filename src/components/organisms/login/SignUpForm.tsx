import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import Paragraph from "../../atoms/Paragraph";
import Span from "../../atoms/Span";
import { useNavigate } from "react-router-dom";

// 이메일 정규식 : 영문자와 숫자만
const regexrID = /^[a-zA-Z0-9]{4,16}$/;
// 비밀번호 형식
const regexrPass = /^[a-zA-Z0-9]{4,16}$/;
//  닉네임 형식
const regexrNickname = /^[가-힣a-zA-Z]{2,10}$/;

const FormWrapper = styled.div`
  padding: 2rem;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f8f8f8;
`;

const FormContainer = styled.div`
  width: 30%;
`;

const FormTitle = styled.h2`
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2rem;
`;

const FormGroup = styled.form`
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  width: 100%;
  padding: 10px;
  border-radius: 3px;
  border: 1px solid #ebebeb;
  font-size: 1.3rem;
`;

const Button = styled.button`
  padding: 1rem;
  width: 100%;
  background: #2da0fa;
  color: white;
  border: none;
  border-radius: 3px;
  font-size: 1.7rem;
  cursor: pointer;

  &:hover {
    background: #1170ff;
  }
`;

const LoginBox = styled.div`
  font-size: 1.3rem;
  text-align: center;
`;

const LoginButton = styled.span`
  margin-left: 5px;
  font-weight: 700;
  border-bottom: 1px solid #000;
`;

const ErrorTextBox = styled.div`
  margin-bottom: 10px;
`;
const ErrorText = styled(Span)`
  color: #f00;
  font-size: 1rem;
`;
const PassText = styled(Span)`
  color: #0c7a00;
  font-size: 1rem;
`;

const initialIdNotice = {
  alert: false,
  message: "",
  // 다른 필요한 프로퍼티들도 추가할 수 있습니다.
};
const SignUpForm = () => {
  const navigate = useNavigate();
  // const [join, setJoin] = useState({
  //   nickname: "",
  //   userId: "",
  //   password: "",
  // });
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [idNotice, setIdNotice] = useState(initialIdNotice);
  const [nickNameNotice, setNicknameNotice] = useState(initialIdNotice);
  const [passNotice, setPassNotice] = useState(initialIdNotice);
  // 닉네임 검사 & 중복검사

  const onBlurNicknameHandler = async () => {
    if (nickname === "") {
      setNicknameNotice({ message: "필수항목입니다.", alert: false });
      return;
    } else if (!regexrNickname.test(nickname)) {
      setNicknameNotice({
        message: " 특수문자를 제외한 2~10자리인 닉네임을 작성해주세요",
        alert: false,
      });
      return;
    } else
      setNicknameNotice({
        message: "",
        alert: false,
      });
  };

  const onCheckNickNameHandler = async () => {
    try {
      const response = await axios.post(
        "/api/users/create",
        { nickname },
        { headers: { "Context-Type": "application/json" } }
      );
      if (response.status === 201) {
        setNicknameNotice({
          message: "사용 가능한 닉네임입니다.",
          alert: true,
        });
      }
    } catch (error) {
      setNicknameNotice({
        message: "이미 사용중인 닉네임입니다.",
        alert: false,
      });
    }
  };

  // ID
  const onBlurIdHandler = () => {
    if (userId === "") {
      setIdNotice({ message: "필수항목입니다.", alert: false });
      return;
    } else if (!regexrID.test(userId)) {
      setIdNotice({
        message: "영문과 숫자가 포함한 문자 4~16자리로 입력해주세요",
        alert: false,
      });
      return;
    }
  };

  const onCheckIDHandler = async () => {
    try {
      const response = await axios.post("/api/users/create", { userId });
      if (response.status === 201) {
        setIdNotice({ message: "사용 가능한 아이디입니다.", alert: true });
      }
    } catch (error) {
      setIdNotice({
        message: "이미 사용중인 아이디입니다.",
        alert: false,
      });
    }
  };
  const onBlurPasswordHandler = () => {
    if (password === "") {
      setPassNotice({ message: "필수항목입니다.", alert: false });
      return;
    } else if (!regexrPass.test(password)) {
      setPassNotice({
        message: "영문과 숫자가 포함한 문자 4~16자리로 입력해주세요",
        alert: false,
      });
      return;
    } else {
      setPassNotice({
        message: "",
        alert: true,
      });
    }
  };
  const signUpUserTest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await axios.post("/api/users/create", {
        userId,
        password,
        nickname,
      });
      console.log(userId + "님의 회원가입이 완료되었습니다.");
      navigate("/login");
      return console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormWrapper>
      <FormContainer>
        <FormTitle>회원가입</FormTitle>

        <FormGroup onSubmit={(e) => signUpUserTest(e)}>
          <>
            <Input
              type="text"
              value={nickname}
              onBlur={onBlurNicknameHandler}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="이름"
            />
            {/* <button type="button" onClick={onCheckNickNameHandler}>
              중복확인
            </button> */}
            <ErrorTextBox>
              {nickNameNotice.hasOwnProperty("alert") ? (
                <ErrorText>{nickNameNotice.message}</ErrorText>
              ) : (
                <PassText>{nickNameNotice.message}</PassText>
              )}
            </ErrorTextBox>
          </>
          <>
            <Input
              type="text"
              value={userId}
              onBlur={onBlurIdHandler}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="아이디"
            />
            {/* <button type="button" onClick={onCheckIDHandler}>
              중복확인
            </button> */}
            <ErrorTextBox>
              {idNotice.hasOwnProperty("alert") ? (
                <ErrorText>{idNotice.message}</ErrorText>
              ) : (
                <PassText>{idNotice.message}</PassText>
              )}
            </ErrorTextBox>
          </>
          <>
            <Input
              type="password"
              value={password}
              onBlur={onBlurPasswordHandler}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
            />
            <ErrorTextBox>
              {passNotice.hasOwnProperty("alert") ? (
                <ErrorText>{passNotice.message}</ErrorText>
              ) : (
                <PassText>{passNotice.message}</PassText>
              )}
            </ErrorTextBox>
          </>

          <Button type="submit">가입하기</Button>
        </FormGroup>
        <LoginBox>
          이미 회원정보가 있으신가요?
          <LoginButton>
            <Link to="/login">로그인</Link>
          </LoginButton>
        </LoginBox>
      </FormContainer>
    </FormWrapper>
  );
};

export default SignUpForm;
