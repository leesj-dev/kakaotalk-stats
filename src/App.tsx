import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./style/Theme";
import MainPage from "./components/pages/MainPage";
import { Routes, Route } from "react-router-dom";
import AttachmentPage from "./components/pages/AttachmentPage";
import DashboardPage from "./components/pages/DashboardPage";
import Footer from "./components/sections/footer/Footer";
import DetailPage from "./components/pages/DetailPage";
import { useSelector } from "react-redux";
import FloatingMenu from "./components/molecules/common/FloatingMenu";
import Wrapper from "./components/wrapper/Wrapper";
import GlobalStyle from "./style/GlobalStyles";
import Navigation from "./components/sections/navigation/Navigation";

// const ThemeToggler = () => {
//   const [theme, setTheme] = useState("light");
//   const switchTheme = "light" === theme ? "dark" : "light";

//   useEffect(() => {
//     document.body.dataset.theme = theme;
//   }, [theme]);

//   return <Dddd onClick={() => setTheme(switchTheme)}>테마 변경</Dddd>;
// };

function App() {
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
        <Footer />
      </Wrapper>
    </>
  );
}

export default App;
