import { useState, useEffect } from "react";
import NavHead from "./NavHead";
import NavSideMenu from "./NavSideMenu";

const Gnb = () => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isWideScreen ? <NavHead /> : <NavSideMenu />;
};

export default Gnb;
