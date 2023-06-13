import React from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./style/Theme";
import MainPage from "./components/pages/MainPage";
import { Routes, Route } from "react-router-dom";
import AttachmentPage from "./components/pages/AttachmentPage";
import DashboardPage from "./components/pages/DashboardPage";
import Footer from "./components/sections/Footer";
import DetailPage from "./components/pages/DetailPage";
import { useSelector } from "react-redux";
import FloatingMenu from "./components/organisms/FloatingMenu";
import Wrapper from "./components/wrapper/Wrapper";
import GlobalStyle from "./style/GlobalStyles";
<<<<<<< HEAD
import NavHead from "./components/sections/NavHead";
=======
>>>>>>> 5bd5030 (feat: defaultTheme 생성 여기저기 css 달라짐)

function App() {
  const isDarkMode = useSelector((state: { isDarkModeSlice: boolean }) => state.isDarkModeSlice);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Wrapper>
        <FloatingMenu />
        <NavHead />
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
    </ThemeProvider>
  );
}

export default App;
