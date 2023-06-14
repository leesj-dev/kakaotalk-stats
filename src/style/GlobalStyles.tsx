import { createGlobalStyle } from "styled-components";
<<<<<<< HEAD

const GlobalStyle = createGlobalStyle`
=======
import PretendardLight from "../fonts/PretendardLight.woff2";
import PretendardRegular from "../fonts/PretendardRegular.woff2";
import PretendardMedium from "../fonts/PretendardMedium.woff2";
import PretendardBold from "../fonts/PretendardBold.woff2";

const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: "Pretendard";
    src: local('PretendardLight'), local('PretendardLight'), url(${PretendardLight}) format('woff2');
    font-weight:300;
  }
  @font-face {
    font-family: "Pretendard";
    src: local('PretendardRegular'), local('PretendardRegular'), url(${PretendardRegular}) format('woff2');
    font-weight:400;
  }
  @font-face {
    font-family: "Pretendard";
    src: local('PretendardMedium'), local('PretendardMedium'), url(${PretendardMedium}) format('woff2');
    font-weight:500;
  }
  @font-face {
    font-family: "Pretendard";
    src: local('PretendardBold'), local('PretendardBold'), url(${PretendardBold}) format('woff2');
    font-weight:700;
  }
>>>>>>> 9f53107 (refactor: 불필요한 파일 삭제, 폴더 정리)


html {
  box-sizing: border-box;
  font-size: 10px;
  background: ${(props) => props.theme.mainBackground};
  color:#f0f;
  background:#f00;
  
  @media (max-width: 768px) {
	font-size: 8px;
  }
}

*,
*:before,
*:after {
  box-sizing: inherit;
}


body {

  font-family: "Pretendard";
<<<<<<< HEAD
  font-weight: normal;
=======
  font-weight: 900;
>>>>>>> 9f53107 (refactor: 불필요한 파일 삭제, 폴더 정리)
  margin: 0;
  padding: 0;
  line-height: 1;
  letter-spacing: -0.025em;
  color: #222222;

}

ul,
ol,
li,
dl,
dt,
dd {
  margin: 0;
  padding: 0;
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6,
figure {
  margin: 0;
  padding: 0;
  font-size: inherit;
  font-weight: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  border: 0;
  vertical-align: middle;
  font-size: 0;
  max-width: 100%;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}

select,
input,
textarea,
button {
  font-size: inherit;
  font-family: "Noto Sans KR";
  font-weight: inherit;
  margin: 0;
}

select,
input,
button {
  vertical-align: middle;
}

b,
strong {
  font-weight: normal;
}

address,
em,
i {
  font-style: normal;
  font-weight:100
}

hr {
  margin: 0;
  padding: 0;
  border: none;
  display: block;
}

header,
footer,
article,
section,
aside,
nav,
main {
  display: block;
}

button,
input,
select,
textarea {
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
}

/* screen reader only */
.sr-only,
.hidden,
.blind,
.IR {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

/* Skip to content */
.skip-to {
  position: absolute;
  top: -99px;
  left: 0;
  background: #333;
  color: #fff;
  width: 100%;
  padding: 10px 0;
  text-align: center;
  text-decoration: none;
  z-index: 999;
}

.skip-to:hover,
.skip-to:focus,
.skip-to:active {
  display: block;
  top: 0;
}

.row:after,
.row:before {
  content: "";
  display: block;
}

.row:after {
  clear: both;
}

`;
export default GlobalStyle;
