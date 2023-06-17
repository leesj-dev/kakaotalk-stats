import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    mainBlue: string;
    mainWhite: string;
    mainBlack: string;
    mainGray: string;
    mainText: string;
    mainBlueHover: string;
    border: string;
    mainBackground: string;
    footerBackground: string;
    navBackground: string;
    dashboardBackground: string;
    dashboardMenuBackground: string;
    modalBackground: string;
    modalContentBackground: string;
    functionArrowWhite: string;
  }
}
