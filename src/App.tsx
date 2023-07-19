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
// const ThemeToggler = () => {
//   const [theme, setTheme] = useState("light");
//   const switchTheme = "light" === theme ? "dark" : "light";

//   useEffect(() => {
//     document.body.dataset.theme = theme;
//   }, [theme]);

//   return <Dddd onClick={() => setTheme(switchTheme)}>테마 변경</Dddd>;
// };

function App() {
  const location = useLocation();
  const isDashboardPage = location.pathname === "/dashboard";

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <FloatingMenu />
        <Navigation />
        <Routes>
          <Route path={"/"} element={<MainPage />} />
          <Route path={"/attachment"} element={<AttachmentPage />} />
          <Route path={"/users"} element={<UserPage />} />
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
