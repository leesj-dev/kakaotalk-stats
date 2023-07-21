import axios from "axios";
import React from "react";
import styled from "styled-components";

const WithdrawContainer = styled.div`
  padding: 2rem;
  background: #f2f2f2;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  font-size: 2rem;
  background-color: #4caf50;
  color: white;
  border-radius: 3px;
  border: none;
`;

export interface UserData {
  userId: string;
  nickname: string;
}

interface WithdrawProps {
  userData: UserData | null;
  setUserData: (userData: UserData | null) => void;
}

const WithdrawButton = ({ userData, setUserData }: WithdrawProps) => {
  const handleClickWithdrawButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      console.log(userData);
      if (userData) {
        const result = await axios.delete(`/api/protected/users/${userData.userId}/withdraw`);
        setUserData(null);
        console.log(userData.userId + "님의 회원탈퇴가 완료되었습니다.");
        return console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <WithdrawContainer>
      <Button onClick={(e) => handleClickWithdrawButton(e)}>회원 탈퇴하기</Button>
    </WithdrawContainer>
  );
};

export default WithdrawButton;
