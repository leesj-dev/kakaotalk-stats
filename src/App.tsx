import React, { useState } from "react";
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
import ScrollToTopFloatingButton from "./components/molecules/ScrollToTopFloatingButton";
import GraphDetailSection from "./components/section/GraphDetailSection";
import { useSelector } from "react-redux";

function App() {
  const isDarkMode = useSelector((state: { isDarkModeSlice: boolean }) => state.isDarkModeSlice);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <ScrollToTopFloatingButton />
      <NavBar />
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
