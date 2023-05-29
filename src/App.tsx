import React, { useState } from "react";
// import Main from "./components/main/Main";
import Wrapper from "./components/wrapper/Wrapper";
import "./style/reset.css";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./style/Theme";
import MainPage from "./components/pages/MainPage";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/organisms/NavBar";
import AttachmentPage from "./components/pages/AttachmentPage";
import AnalysisPage from "./components/pages/AnalysisPage";
import Footer from "./components/organisms/Footer";
import ScrollTopTopFloatingButton from "./components/molecules/ScrollTopTopFloatingButton";
import GraphDetailSection from "./components/section/GraphDetailSection";

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <ScrollTopTopFloatingButton />
      <NavBar setIsDarkMode={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode} />
      <Wrapper>
        <Routes>
          <Route path={"/"} element={<MainPage />} />
          <Route path={"/2"} element={<AttachmentPage />} />
        </Routes>
      </Wrapper>
      <Routes>
        <Route path={"/dashboard"} element={<AnalysisPage />} />
        <Route path={"/dashboard/detail/"} element={<GraphDetailSection />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
