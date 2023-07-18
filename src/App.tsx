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
// const ThemeToggler = () => {
//   const [theme, setTheme] = useState("light");
//   const switchTheme = "light" === theme ? "dark" : "light";

//   useEffect(() => {
//     document.body.dataset.theme = theme;
//   }, [theme]);

//   return <Dddd onClick={() => setTheme(switchTheme)}>테마 변경</Dddd>;
// };

function App() {
  const [accessToken, setAccessToken] = useState<string>("");

  const location = useLocation();
  const isDashboardPage = location.pathname === "/dashboard";

  useEffect(() => {
    const createUserTest = async () => {
      const result = await axios.post("/api/users/create", {
        userId: "testId",
        password: "testPassword",
        nickname: "testNickname",
      });
      return console.log(result);
    };

    (async () => {
      await createUserTest();
    })();
  }, []);

  useEffect(() => {
    const signInTest = async () => {
      const result = await axios.post("/api/users/signin", {
        userId: "testId",
        password: "testPassword",
        nickname: "testNickname",
      });
      console.log(result.data.accessToken);
      setAccessToken(result.data.accessToken);
      return console.log(result);
    };

    (async () => {
      await signInTest();
    })();
  }, []);

  useEffect(() => {
    const protectedUrlTest = async () => {
      console.log(accessToken);
      const result = await axios.post("/api/protected/edit", null, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      console.log("????");
      return console.log(result);
    };

    (async () => {
      await protectedUrlTest();
    })();
  }, [accessToken]);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <FloatingMenu />
        <Navigation />
        <Routes>
          <Route path={"/"} element={<MainPage />} />
          <Route path={"/attachment"} element={<AttachmentPage />} />
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
