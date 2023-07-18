const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: "../.env" });
const { hashPassword } = require("./module/hashPassword/hashPassword");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./module/accessToken/authenticateToken");
const { cleanUpExpiredTokens } = require("./module/accessToken/cleanUpExpiredTokens");

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_CONNECTION;
const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;

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
app.use("/api/protected", authenticateToken);

// user Schema를 정의합니다.
const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true, unique: true },
  accessToken: { type: String },
  tokenExpiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } },
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
      // 중복된 아이디 또는 닉네임
      const key = Object.keys(error.keyValue)[0];
      const value = error.keyValue[key];
      console.error(error, `error[11000]: 중복된 아이디나 닉네임 에러`);
      res.status(409).json({ error: `${key} '${value}'는 이미 사용 중입니다.` });
    } else {
      // 이외의 예상치 못한 오류
      console.error(error);
      res.status(500).json({ error: "회원 가입 중 오류가 발생했습니다." });
    }
  }
});

// 로그인 핸들러
app.post("/api/users/signin", async (req, res) => {
  try {
    const { userId, password } = req.body;
    const foundUserData = await User.findOne({ userId });

    // 존재하지 않는 userId
    if (!foundUserData) {
      return res.status(401).json({ error: "존재하지 않는 ID입니다." });
    }

    const isMatchedPassword = await bcrypt.compare(password, foundUserData.password);
    // 일치하지 않는 password
    if (!isMatchedPassword) {
      return res.status(401).json({ error: "비밀번호가 일치하지 않습니다." });
    }

    // 로그인 성공
    const accessToken = jwt.sign({ userId }, accessTokenSecretKey, { expiresIn: "2h" });
    await User.updateOne(
      { userId },
      { $set: { token: accessToken, tokenExpiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000) } }
    );
    res.status(200).json({
      message: "로그인되었습니다.",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "로그인 중 오류가 발생했습니다." });
  }
});

// 주기적으로 만료된 토큰 정리 작업 수행
setInterval(cleanUpExpiredTokens, 24 * 60 * 60 * 1000); // 24시간마다 실행 (주기는 애플리케이션에 맞게 조정 가능)

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});
