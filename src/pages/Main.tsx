import React from "react";
import FunctionCard from "../organisms/FunctionCard";
import MainVisual from "../organisms/MainVisual";
import NavBar from "../organisms/NavBar";

const Main = () => {
  return (
    <div>
      <NavBar />
      <MainVisual />
      <FunctionCard />
    </div>
  );
};

export default Main;
