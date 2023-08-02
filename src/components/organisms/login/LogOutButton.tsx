import axios from "axios";
import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setUserLoginDataSlice } from "../../../store/reducer/userData/userLoginDataSlice";
import { AccessToken } from "../../../@types/index.d";

const LogOutContainer = styled.div``;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const LogOutButton = ({ accessToken }: AccessToken) => {
  const dispatch = useDispatch();

  // LogOut Post 요청 보내기
  const postLogOut = async () => {
    try {
      const result = await axios.post("/api/protected/users/signout", null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return result.data;
    } catch (error) {
      console.error(error);
    }
  };

  // LogOut 상태 업데이트
  const handleLogOutDispatch = () => {
    dispatch(
      setUserLoginDataSlice({
        userId: "",
        nickname: "",
      })
    );
  };

  // LogOut Button 클릭 핸들러
  const handleClickLogoutButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await postLogOut();
    } catch (error) {
      console.error(error);
    }
    handleLogOutDispatch();
    window.alert("로그아웃되었습니다.");
  };

  return (
    <LogOutContainer>
      <Button onClick={(e) => handleClickLogoutButton(e)}>로그아웃</Button>
    </LogOutContainer>
  );
};

export default LogOutButton;
