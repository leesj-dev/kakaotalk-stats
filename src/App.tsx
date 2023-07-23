import MainPage from "./components/pages/MainPage";
import { Routes, Route } from "react-router-dom";
import AttachmentPage from "./components/pages/AttachmentPage";
import DashboardPage from "./components/pages/DashboardPage";
import Footer from "./components/sections/footer/Footer";
import DetailPage from "./components/pages/DetailPage";
import FloatingMenu from "./components/molecules/common/FloatingMenu";
import Wrapper from "./components/wrapper/Wrapper";
import GlobalStyle from "./style/GlobalStyles";
import Navigation from "./components/sections/navigation/Navigation";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import UserPage from "./components/pages/UserPage";
import { getTokenFromCookie } from "./module/common/getTokenFromCookie";
import { UserData } from "./components/organisms/login/WithdrawButton";

function App() {
  const location = useLocation();
  const isDashboardPage = location.pathname === "/dashboard";

  const [userData, setUserData] = useState<UserData | null>(null);
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const cookieCheckForRememberLogin = async () => {
      const cookieAccessToken = getTokenFromCookie(document.cookie);
      if (cookieAccessToken) {
        const result = await axios.post("/api/users/login", null, {
          headers: {
            Authorization: `Bearer ${cookieAccessToken}`,
          },
        });
        setAccessToken(cookieAccessToken);
        console.log(result.data.userId + "님의 자동 로그인이 완료되었습니다.");
        return setUserData(result.data);
      }
    };

    // 쿠키에 accessToken이 존재하는 경우 자동 로그인 시도
    (async () => cookieCheckForRememberLogin())();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <FloatingMenu />
        <Navigation />
        <Routes>
          <Route path={"/"} element={<MainPage />} />
          <Route path={"/attachment"} element={<AttachmentPage />} />
          <Route
            path={"/users"}
            element={
              <UserPage
                userData={userData}
                setUserData={setUserData}
                accessToken={accessToken}
                setAccessToken={setAccessToken}
              />
            }
          />
        </Routes>
        <Routes>
          <Route path={"/dashboard"} element={<DashboardPage />} />
          <Route path={"/detail"} element={<DetailPage />} />
        </Routes>
        {isDashboardPage ? <Footer dashboard={true} /> : <Footer />}
      </Wrapper>
    </>
  );
}

export default App;
