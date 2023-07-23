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
const bodyParser = require("body-parser");

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
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/protected", authenticateToken(accessTokenSecretKey, User));

// 회원 가입 핸들러
app.post("/api/users/create", async (req, res) => {
  console.log(req.path);
  try {
    const { userId, password, nickname } = req.body;
    console.log(`회원가입 시도 - ID: [${userId}] Nickname: [${nickname}]`);

    const hashedPassword = await hashPassword(password);
    const newUser = new User({ userId, password: hashedPassword, nickname });
    await newUser.save();

    // 회원 가입 성공
    console.log(`회원가입 성공 - ID: [${userId}] Nickname: [${nickname}]`);
    res.status(201).json({ message: "회원 가입이 완료되었습니다." });
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

// 로그인 핸들러
app.post("/api/users/login", async (req, res) => {
  console.log(req.path);

  try {
    const requestedAccessToken = getTokenFromCookie(req, res, "accessToken");
    const { userId, password, isRememberMe } = req.body;
    // accessToken 없이 새롭게 로그인하는 경우
    if (!requestedAccessToken) {
      console.log(`로그인 시도 - ID: [${userId}]`);

      console.log(await User.find());
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
      const refreshToken = jwt.sign({ userId }, accessTokenSecretKey, {
        expiresIn: "7d",
        issuer: "young",
      });
      await User.updateOne(
        { userId },
        { $set: { refreshToken, tokenExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) } }
      );

      // accessToken 발급
      const accessToken = jwt.sign({ userId, isRememberMe }, accessTokenSecretKey, {
        expiresIn: "10s",
        issuer: "young",
      });

      if (isRememberMe) {
        res.cookie("accessToken", accessToken);
      } else {
        res.cookie("accessToken", accessToken, { maxAge: 10 * 1000 });
      }
      console.log(`로그인 성공 - ID: [${userId}]`);

      return res.status(200).json({
        message: "로그인되었습니다.",
        data: {
          userId,
          nickname: userData.nickname,
        },
      });
    }

    // accessToken을 소유한 경우
    const isValidAccessToken = verifyToken(requestedAccessToken, accessTokenSecretKey);
    const decodedTokenData = jwt.decode(requestedAccessToken, accessTokenSecretKey);
    const requestedUserId = decodedTokenData.userId;
    const requestedUser = await User.findOne({ userId: requestedUserId });
    const isValidRefreshToken = verifyToken(requestedUser.refreshToken, accessTokenSecretKey);

    // 유효하지 않은 토큰이거나 로그인 기간이 만료된 경우
    if (!isValidAccessToken && !isValidRefreshToken) {
      console.log(isValidAccessToken, isValidRefreshToken, "만료");
      res.clearCookie("accessToken");
      return res.status(409).json({ error: "로그인 기간 만료" });
    }

    // accessToken이 만료되었지만 유효한 refreshToken을 가지고 있는 경우 newAccessToken 발급
    if (!isValidAccessToken && isValidRefreshToken) {
      console.log(isValidAccessToken, isValidRefreshToken, "재발급");
      // newAccessToken 발급
      const accessToken = jwt.sign({ userId: requestedUserId, isRememberMe }, accessTokenSecretKey, {
        expiresIn: "10s",
        issuer: "young",
      });

      const beforeRememberMeData = decodedTokenData.isRememberMe;
      if (isRememberMe || beforeRememberMeData) {
        res.cookie("accessToken", accessToken);
      } else {
        res.cookie("accessToken", accessToken, { maxAge: 10 * 1000 });
      }
    }

    // 유효한 accessToken을 가지고 있는 경우 로그인
    console.log(`로그인 성공 - ID: [${requestedUser.userId}]`);
    return res.status(200).json({
      message: "로그인 되었습니다.",
      data: {
        userId: requestedUser.userId,
        nickname: requestedUser.nickname,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "로그인 중 오류가 발생했습니다." });
  }
});

app.post("/api/protected/edit", (req, res) => {
  console.log(req.path);
  const userData = res.locals.userData;
  // 인증된 클라이언트에게만 허용된 핸들러 로직
  res.status(200).json(userData);
});

//로그아웃
app.post("/api/protected/users/signout", async (req, res) => {
  console.log(req.path);
  try {
    const accessToken = getTokenFromCookie(req, res, "accessToken");
    const requestedUserId = jwt.decode(accessToken, accessTokenSecretKey).userId;
    const { userId } = await User.findOne({ userId: requestedUserId });

    // 클라이언트의 db에 존재하는 refreshToken 데이터 초기화
    await User.updateOne(
      { userId },
      {
        $set: { tokenExpiresAt: "", refreshToken: "" },
      }
    );

    // 클라이언트 쿠키 정리
    res.clearCookie("accessToken");
    res.status(200).json({ message: "로그아웃 되었습니다." });
  } catch (error) {
    console.error(error);
  }
});

//회원 탈퇴
app.delete("/api/protected/users/:userId/withdraw", async (req, res) => {
  console.log(req.path);
  try {
    const requestedUserId = req.params.userId;
    console.log(`회원탈퇴 시도 - ID: [${requestedUserId}]`);
    const accessToken = getTokenFromCookie(req, res, "accessToken");
    const decodedUserId = jwt.decode(accessToken, accessTokenSecretKey).userId;

    const isMatchedUserId = requestedUserId === decodedUserId;
    if (isMatchedUserId) {
      const { userId } = await User.findOne({ userId: requestedUserId });
      // db에 존재하는 user 데이터 삭제
      await User.deleteOne({ userId });
    }

    // 클라이언트 쿠키 정리
    res.clearCookie("accessToken");
    console.log(`회원탈퇴 성공 - ID: [${requestedUserId}]`);
    res.status(200).json({ message: `${requestedUserId}님의 회원탈퇴가 완료되었습니다.` });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "회원탈퇴 작업 수행 중 문제가 발생하였습니다." });
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
