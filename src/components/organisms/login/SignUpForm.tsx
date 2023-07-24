import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  background: #f2f2f2;
  padding: 2rem;
  border-radius: 5px;
`;

const FormTitle = styled.h2`
  margin-bottom: 1rem;
  text-align: center;
  font-size: 2rem;
`;

const FormGroup = styled.form`
  margin-bottom: 1rem;
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
  padding: 1rem;
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

const SignUpForm = () => {
  const [nickname, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const signUpUserTest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await axios.post("/api/users/create", {
        userId,
        password,
        nickname,
      });
      console.log(userId + "님의 회원가입이 완료되었습니다.");
      return console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormContainer>
      <FormTitle>회원가입</FormTitle>
      <FormGroup onSubmit={(e) => signUpUserTest(e)}>
        <Label>이름</Label>
        <Input type="text" value={nickname} onChange={(e) => setName(e.target.value)} />
        <Label>아이디</Label>
        <Input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <Label>비밀번호</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit">가입하기</Button>
      </FormGroup>
    </FormContainer>
  );
};

export default SignUpForm;
