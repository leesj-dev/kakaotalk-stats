import React, { useState } from "react";
// import Main from "./components/main/Main";
import Wrapper from "./components/wrapper/Wrapper";
import "./style/reset.css";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./style/Theme";
import Main2 from "./pages/Main2";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/organisms/NavBar";
import AttachmentPage from "./components/pages/AttachmentPage";
import AnalysisPage from "./components/pages/AnalysisPage";

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <NavBar />
      <Wrapper>
        <Routes>
          <Route path={"/"} element={<Main2 />} />
          <Route path={"/2"} element={<AttachmentPage />} />
          <Route path={"/dashboard"} element={<AnalysisPage />} />
        </Routes>
      </Wrapper>
      {/* <div onClick={() => setIsDarkMode(!isDarkMode)}>다크모드</div> */}
    </ThemeProvider>
  );
}

export default App;
