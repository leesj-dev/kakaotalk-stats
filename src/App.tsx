import React, { useState } from "react";
// import Main from "./components/main/Main";
import Wrapper from "./components/wrapper/Wrapper";
import "./style/reset.css";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./style/Theme";
import Main2 from "./pages/Main2";
import { Routes, Route } from "react-router-dom";
import Main from "./components/main/Main";

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Wrapper>
        <Routes>
          <Route path={"/1"} element={<Main2 />} />
          <Route path={"/2"} element={<Main />} />
        </Routes>
      </Wrapper>
      {/* <div onClick={() => setIsDarkMode(!isDarkMode)}>다크모드</div> */}
    </ThemeProvider>
  );
}

export default App;
