import styled from "styled-components";
import SignUpForm from "../organisms/login/SignUpForm";

const SigUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  height: calc(100vh - 210.5px);
`;

const SignUp = () => {
  return (
    <SigUpContainer>
      <SignUpForm />
    </SigUpContainer>
  );
};

export default SignUp;
