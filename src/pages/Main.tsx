import React from "react";
import FunctionCard from "../components/organisms/FunctionCard";
import MainVisual from "../components/organisms/MainVisual";
import NavBar from "../components/organisms/NavBar";

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
