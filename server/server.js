const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: "../.env" });
const { hashPassword } = require("./module/hashPassword/hashPassword");

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_CONNECTION;

// MongoDB 연결 설정
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB에 연결되었습니다.");
  })
  .catch((error) => {
    console.error("MongoDB 연결에 실패했습니다.", error);
  });

app.use(cors()); // CORS 미들웨어 추가
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../build")));

// user Schema를 정의합니다.
const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true, unique: true },
});

// user model을  class로 생성합니다.
const User = mongoose.model("User", userSchema);

// 회원 가입 핸들러
app.post("/api/users/create", async (req, res) => {
  try {
    const { userId, password, nickname } = req.body;
    const hashedPassword = await hashPassword(password);

    const newUser = new User({ userId, password: hashedPassword, nickname });

    await newUser.save();

    // 회원 가입 성공
    res.status(200).json({ message: "회원 가입이 완료되었습니다." });
  } catch (error) {
    if (error.code === 11000) {
      // 중복된 아이디나 닉네임인 경우 처리
      const key = Object.keys(error.keyValue)[0];
      const value = error.keyValue[key];
      console.error(error, `error[11000]: 중복된 아이디나 닉네임 에러`);
      res.status(409).json({ error: `${key} '${value}'는 이미 사용 중입니다.` });
    } else {
      // 기타 오류 처리
      console.error(error);
      res.status(500).json({ error: "회원 가입 중 오류가 발생했습니다." });
    }
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});
