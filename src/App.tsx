import React from "react";
import Main from "./components/main/Main";
import Wrapper from "./components/wrapper/Wrapper";
import "./style/reset.css";

function App() {
  return (
    <div className="App">
      <Wrapper>
        <Main></Main>
      </Wrapper>
    </div>
  );
}

export default App;
