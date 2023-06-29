import { DefaultTheme, css } from "styled-components";

export const lightTheme: DefaultTheme = {
  mainBlue: "#2da0fa",
  mainWhite: "#ffffff",
  mainBlack: "#191F28",
  mainGray: "#a5aeb7",
  mainText: "#191F28",
  mainBlueHover: "#217aff",
  border: "#e1e1e1",
  mainBackground: "#ffffff",
  footerBackground: "#f2f2f2",
  navBackground: "#ffffff",
  dashboardBackground: "#2da0fa",
  dashboardMenuBackground: "#acdbff",
  modalBackground: "#fafafa5f",
  modalContentBackground: "#ffffff9d",
  functionArrowWhite: "#fff",
};
export const darkTheme: DefaultTheme = {
  mainBlue: " #0d92ff",
  mainWhite: "#2b2b2b",
  mainBlack: "#000000",
  mainGray: "#676767",
  mainText: "#ffffff",
  mainBlueHover: "#0066ff",
  border: "#515151",
  mainBackground: "#171717",
  footerBackground: "#202020",
  navBackground: "#202020",
  dashboardBackground: "#151515",
  dashboardMenuBackground: "#151515",
  modalBackground: "#44444440",
  modalContentBackground: "#60606070",
  functionArrowWhite: "#fff",
};

export const StyledSpan = {
  size22: css`
    font-size: 22px;
    font-weight: 400;
    color: #f00;
  `,
  size20: css`
    font-size: 20px;
    font-weight: 300;
  `,
};
