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
const cookieParser = require("cookie-parser");
const { verifyToken } = require("./module/accessToken/jwtVerifyToken");
const { getTokenFromCookie } = require("./module/accessToken/getTokenFromCookie");

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
const kmgDB = mongoose;

// user Schema를 정의합니다.
const userSchema = new kmgDB.Schema({
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true, unique: true },
  refreshToken: { type: String },
  accessToken: { type: String },
  tokenExpiresAt: { type: Date, index: { expireAfterSeconds: 0 } },
});

// user model을  class로 생성합니다.
const User = kmgDB.model("User", userSchema);

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../build")));
app.use("/api/protected", authenticateToken(accessTokenSecretKey, User));
app.use(cookieParser());

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
      // 중복된 아이디 또는 닉네임 오류
      const key = Object.keys(error.keyValue)[0];
      const value = error.keyValue[key];
      console.error(`error[11000]: 중복된 아이디나 닉네임 에러`);
      res.status(409).json({ error: `${key} '${value}'는 이미 사용 중입니다.` });
    } else {
      // 이외의 예상치 못한 오류
      console.error(error);
      res.status(500).json({ error: "회원 가입 중 오류가 발생했습니다." });
    }
  }
});

app.post("/api/users/login");

// 로그인 핸들러
app.post("/api/users/login", async (req, res) => {
  try {
    const requestedRefreshToken = getTokenFromCookie(req, res, "refreshToken");
    const isValidRefreshToken = verifyToken(requestedRefreshToken, accessTokenSecretKey);

    // 유효한 requestedRefreshToken을 가지고 있는 경우 자동 로그인
    if (requestedRefreshToken) {
      const userData = await User.findOne({ refreshToken: requestedRefreshToken });
      const isMatchedRefreshToken = requestedRefreshToken === userData.refreshToken;
      if (isValidRefreshToken && isMatchedRefreshToken) {
        const { userId } = jwt.decode(requestedRefreshToken, accessTokenSecretKey);
        const accessToken = jwt.sign({ userId }, accessTokenSecretKey, {
          expiresIn: "1h",
          issuer: "young",
        });
        return res.status(200).json({
          message: "로그인 되었습니다.",
          accessToken,
          data: {
            userId,
            nickname: userData.nickname,
          },
        });
      }
    }

    const { userId, password } = req.body;
    const userData = await User.findOne({ userId });

    // 존재하지 않는 userId
    if (!userData) {
      return res.status(401).json({ error: "존재하지 않는 ID입니다." });
    }

    // 일치하지 않는 password
    const isMatchedPassword = await bcrypt.compare(password, userData.password);
    if (!isMatchedPassword) {
      return res.status(401).json({ error: "비밀번호가 일치하지 않습니다." });
    }

    // 로그인 성공
    const refreshToken = jwt.sign({ userId }, accessTokenSecretKey, { expiresIn: "7d" });
    await User.updateOne(
      { userId },
      { $set: { refreshToken, tokenExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) } }
    );
    // refreshToken 발급
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const accessToken = jwt.sign({ userId }, accessTokenSecretKey, {
      expiresIn: "1h",
      issuer: "young",
    });
    res.status(200).json({
      message: "로그인되었습니다.",
      accessToken,
      data: {
        userId,
        nickname: userData.nickname,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "로그인 중 오류가 발생했습니다." });
  }
});

app.post("/api/protected/edit", (req, res) => {
  // 인증된 클라이언트에게만 허용된 핸들러 로직
  res.status(200).json({ message: "인증 되었습니다." });
});

//로그아웃
app.post("/api/protected/users/signout", async (req, res) => {
  try {
    const refreshToken = getTokenFromCookie(req, res, "refreshToken");

    // 클라이언트의 db에 존재하는 refreshToken 데이터 초기화
    await User.updateOne(
      { refreshToken },
      {
        $set: { tokenExpiresAt: "", refreshToken: "" },
      }
    );

    // 클라이언트 쿠키 정리
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "로그아웃 되었습니다." });
  } catch (error) {
    console.error(error);
  }
});

// 주기적으로 만료된 토큰 정리 작업 수행
setInterval(() => {
  cleanUpExpiredTokens(User);
}, 10 * 60 * 1000);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});
