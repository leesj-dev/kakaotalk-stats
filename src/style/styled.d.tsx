import { DefaultTheme } from "styled-components";

// DefaultTheme을 확장한 CustomTheme 인터페이스 정의
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
