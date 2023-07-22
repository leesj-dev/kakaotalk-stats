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

  useEffect(() => {
    const cookieCheckForRememberLogin = async () => {
      const accessToken = getTokenFromCookie(document.cookie);
      if (accessToken) {
        const result = await axios.post("/api/users/login", null);
        return setUserData(result.data.data);
      }
    };
    (async () => cookieCheckForRememberLogin())();
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <FloatingMenu />
        <Navigation />
        <Routes>
          <Route path={"/"} element={<MainPage />} />
          <Route path={"/attachment"} element={<AttachmentPage />} />
          <Route path={"/users"} element={<UserPage userData={userData} setUserData={setUserData} />} />
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
