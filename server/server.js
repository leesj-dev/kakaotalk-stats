const express = require("express");

const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../build")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build/index.html"));
});

app.get("/api/test", (req, res) => {
  try {
    res.status(199).json("테스트 결과 받았다");
  } catch (error) {
    console.error(error);
    res.status(500).json("에러인디요");
  }
});

app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});
