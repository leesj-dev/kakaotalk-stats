import styled from "styled-components";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import Span from "../../atoms/Span";
import { Link } from "react-router-dom";

// 이메일 정규식 : 영문자와 숫자만
const regexID = /^[a-zA-Z0-9]{4,16}$/;
// 비밀번호 형식
const regexPass = /^[a-zA-Z가-힣!@#$%^&*()_+|<>?:{}]*.{4,16}$/;
//  닉네임 형식
const regexNickname = /^[가-힣a-zA-Z]{2,10}$/;

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
  background: var(--mainBlue);
  color: white;
  border: none;
  border-radius: 3px;
  font-size: 1.7rem;
  cursor: pointer;

  &:hover {
    background: var(--mainBlueHover);
  }
`;

const LoginBox = styled.div`
  font-size: 1.3rem;
  text-align: center;
`;

const LoginButton = styled.span`
  margin-left: 5px;
  font-weight: 700;
  border-bottom: 1px solid var(--mainText);
`;

const ErrorTextBox = styled.div`
  margin-bottom: 10px;
`;

const ErrorText = styled(Span)`
  color: var(--mainRed);
  font-size: 1rem;
`;

const initialIdNotice = {
  alert: false,
  message: "",
};

const SigUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  height: calc(100vh - 210.5px);
`;

const SignUpForm = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [idNotice, setIdNotice] = useState(initialIdNotice);
  const [nickNameNotice, setNicknameNotice] = useState(initialIdNotice);
  const [passNotice, setPassNotice] = useState(initialIdNotice);

  // Nickname
  const onBlurNicknameHandler = async () => {
    const isValidNickname = regexNickname.test(nickname);
    if (nickname === "") {
      setNicknameNotice({ message: "필수항목입니다.", alert: false });
      return;
    }
    if (!isValidNickname) {
      setNicknameNotice({
        message: "2 ~ 10자의 한글, 영문 조합으로 입력해야 합니다.",
        alert: false,
      });
      return;
    }
    setNicknameNotice({
      message: "",
      alert: true,
    });
  };

  // ID
  const onBlurIdHandler = () => {
    const isValidID = regexID.test(userId);
    if (userId === "") {
      setIdNotice({ message: "필수항목입니다.", alert: false });
      return;
    }
    if (isValidID) {
      setIdNotice({
        message: "4 ~ 16자의 영문, 숫자 조합으로 입력해야 합니다.",
        alert: false,
      });
      return;
    }
    setIdNotice({
      message: "",
      alert: true,
    });
  };

  // Password
  const onBlurPasswordHandler = () => {
    const isValidPassword = regexPass.test(password);

    if (password === "") {
      setPassNotice({ message: "필수항목입니다.", alert: false });
      return;
    }
    if (!isValidPassword) {
      setPassNotice({
        message: "한글을 제외한 4 ~ 16자의 문자로 입력해야 합니다.",
        alert: false,
      });
      return;
    }
    setPassNotice({
      message: "",
      alert: true,
    });
  };

  const signUpUserTest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await axios.post("/api/users/create", {
        userId,
        password,
        nickname,
      });
      navigate("/users/login");
      return console.log(result);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const data = axiosError.response?.data as { status: string; error: string };
        const subCode = data?.status;

        if (subCode === "409-1") {
          setIdNotice({ message: "이미 사용중인 아이디입니다", alert: false });
        }
        if (subCode === "409-2") {
          setNicknameNotice({ message: "이미 사용중인 닉네임입니다", alert: false });
        }
        if (subCode === "409-3") {
          setIdNotice({ message: "이미 사용중인 아이디입니다", alert: false });
          setNicknameNotice({ message: "이미 사용중인 닉네임입니다", alert: false });
        }
      }
    }
  };

  return (
    <FormWrapper>
      <SigUpContainer>
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
              <ErrorTextBox>
                {nickNameNotice.alert ? null : <ErrorText>{nickNameNotice.message}</ErrorText>}
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

              <ErrorTextBox>
                {idNotice.alert ? null : <ErrorText>{idNotice.message}</ErrorText>}
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
                {passNotice.alert ? null : <ErrorText>{passNotice.message}</ErrorText>}
              </ErrorTextBox>
            </>
            <Button type="submit">가입하기</Button>
          </FormGroup>
          <LoginBox>
            이미 회원정보가 있으신가요?
            <LoginButton>
              <Link to="/users/login">로그인</Link>
            </LoginButton>
          </LoginBox>
        </FormContainer>
      </SigUpContainer>
    </FormWrapper>
  );
};

export default SignUpForm;
