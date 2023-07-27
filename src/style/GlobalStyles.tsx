import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

html {
  box-sizing: border-box;
  font-size: 10px;
  @media (max-width: 768px) {
	font-size: 9px;
  }
}

*,
*:before,
*:after {
  box-sizing: inherit;
/* outline: 1px solid #f00; */
}

body {
  font-family: "Pretendard";
  font-weight: normal;
  margin: 0;
  padding: 0;
  line-height: 1;
  letter-spacing: -0.025em;
}

body[data-theme='light'] {
  --mainBlue: #2da0fa;
  --mainWhite: #ffffff;
  --mainBlack: #191F28;
  --mainGray: #a5aeb7;
  --mainText: #191F28;
  --mainBlueHover: #1170ff;
  --border: #e1e1e1;
  --mainBackground: #ffffff;
  --footerBackground: #f2f2f2;
  --navBackground: #ffffff;
  --dashboardBackground: #2da0fa;
  --dashboardMenuBackground: #acdbff;
  --modalBackground: #fafafa5f;
  --modalContentBackground: #ffffff9d;
  --bothWhite: #fff;
  --brushFill: #ffffff10;
  --brushStroke:#5eb9ff;
}

body[data-theme='dark'] {
  --mainBlue: #0d92ff;
  --mainWhite: #2b2b2b;
  --mainBlack: #000000;
  --mainGray: #676767;
  --mainText: #ffffff;
  --mainBlueHover: #1170ff;
  --border: #515151;
  --mainBackground: #171717;
  --footerBackground: #202020;
  --navBackground: #202020;
  --dashboardBackground: #151515;
  --dashboardMenuBackground: #60606070;
  --modalBackground: #44444440;
  --modalContentBackground: #60606070;
  --bothWhite: #fff;
  --brushFill: #ffffff10;
  --brushStroke:#00b7ff;
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
  user-select: none;
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
  font-weight: inherit;
  margin: 0;
}

select,
input,
button {
  vertical-align: middle;
  user-select: none;
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
