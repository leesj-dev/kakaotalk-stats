import styled from "styled-components";
import { Outlet } from "react-router";

const UserPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 210.5px);
`;

const UserPage = () => {
  return (
    <UserPageContainer>
      <Outlet />

      {/* <WithdrawButton userData={userData} setUserData={setUserData} accessToken={accessToken} /> */}
    </UserPageContainer>
  );
};

export default UserPage;
