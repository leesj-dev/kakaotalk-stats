import React, { useState } from "react";
//import Main from "./components/main/Main";
import Main from "./pages/Main";
import Wrapper from "./components/wrapper/Wrapper";
import "./style/reset.css";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./style/Theme";

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <div className="App">
        {/* <div onClick={() => setIsDarkMode(!isDarkMode)}>다크모드</div> */}
        <Wrapper>
          <Main />
        </Wrapper>
      </div>
    </ThemeProvider>
  );
}

export default App;
