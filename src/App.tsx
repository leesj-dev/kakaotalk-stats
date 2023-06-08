import React from "react";
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
import GraphDetailSection from "./components/pages/GraphDetailPage";
import { useSelector } from "react-redux";
import FloatingMenu from "./components/organisms/FloatingMenu";

function App() {
  const isDarkMode = useSelector((state: { isDarkModeSlice: boolean }) => state.isDarkModeSlice);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <FloatingMenu />
      <NavBar />
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route path={"/2"} element={<AttachmentPage />} />
      </Routes>
      <Routes>
        <Route path={"/dashboard"} element={<AnalysisPage />} />
        <Route path={"/dashboard/detail/"} element={<GraphDetailSection />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
