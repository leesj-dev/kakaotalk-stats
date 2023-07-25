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
const { createAccessToken } = require("./module/accessToken/createAccessToken");

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

// 230725 todo: validator 이용하여 error 출력 기능
const userSchema = new kmgDB.Schema({
  userId: {
    type: String,
    required: [true, "아이디를 입력하세요."],
    unique: true,
    match: [/[a-zA-Z0-9]{4,16}/, "아이디는 4 ~ 16자의 영문, 숫자 조합으로 입력해야 합니다."],
    trim: true,
  },
  password: { type: String, required: true, trim: true },
  nickname: {
    type: String,
    required: [true, "닉네임을 입력하세요."],
    unique: true,
    trim: true,
  },
  refreshToken: { type: String },
  accessToken: { type: String },
  tokenExpiresAt: { type: Date, index: { expireAfterSeconds: 0 } },
});

const postSchema = new kmgDB.Schema({
  postId: { type: Number, required: true, unique: true },
  userId: { type: String, required: true },
  nickname: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  isPrivate: { type: Boolean, default: false },
});

const autoIncrementSchema = new mongoose.Schema({
  model: String, // Auto-increment를 적용할 대상 컬렉션의 이름
  field: String, // Auto-increment를 적용할 필드의 이름
  count: { type: Number, default: 0 }, // 현재까지 사용된 숫자 카운트
});

const User = kmgDB.model("User", userSchema);
const Post = kmgDB.model("Post", postSchema);
const Counter = mongoose.model("Counter", autoIncrementSchema);

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../build")));
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/protected", authenticateToken(accessTokenSecretKey, User));

// 회원 가입
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

// 로그인
app.post("/api/users/login", async (req, res) => {
  console.log(req.path);

  try {
    // user 데이터 확인
    const requestedAccessToken = getTokenFromCookie(req, res, "accessToken");
    const { userId, password, isRememberMe } = req.body;
    const userData = await User.findOne({ userId });

    // accessToken 없이 새롭게 로그인하는 경우
    if (!requestedAccessToken) {
      console.log(`로그인 시도 - ID: [${userId}]`);
      // 존재하지 않는 userId
      if (!userData) {
        console.log(`로그인 에러: 존재하지 않는 userId - ${userId}`);
        return res.status(401).json({ error: "존재하지 않는 ID입니다." });
      }

      // 일치하지 않는 password
      const isMatchedPassword = await bcrypt.compare(password, userData.password);
      if (!isMatchedPassword) {
        console.log(`패스워드 에러: 일치하지 않는 패스워드 userId - ${userId}`);
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
      console.log(`새로운 refreshToken 발급: userId - [${userId}]`);

      // accessToken 발급
      const accessToken = createAccessToken(userId, accessTokenSecretKey, isRememberMe);

      // 자동 로그인에 체크한 경우 쿠키에 accessToken 저장
      if (isRememberMe) {
        console.log(`자동 로그인: accessToken 쿠키에 저장 userId - ${userId}`);
        res.cookie("accessToken", accessToken);
      }

      console.log(`로그인 성공: userId - [${userId}]`);
      return res.status(200).json({
        message: "로그인되었습니다.",
        userId,
        accessToken,
        nickname: userData.nickname,
      });
    }

    // accessToken을 소유한 경우
    const isValidAccessToken = verifyToken(requestedAccessToken, accessTokenSecretKey);
    const decodedTokenData = jwt.decode(requestedAccessToken, accessTokenSecretKey);
    const requestedUserId = decodedTokenData.userId;
    const requestedUser = await User.findOne({ userId: requestedUserId });
    const isValidRefreshToken = verifyToken(requestedUser.refreshToken, accessTokenSecretKey);
    const isRememberMeBefore = decodedTokenData.isRememberMe;
    console.log(`로그인 시도: userId - [${requestedUserId}]`);

    // 유효하지 않은 토큰이거나 로그인 기간이 만료된 경우
    if (!isValidAccessToken && !isValidRefreshToken) {
      console.log(`로그인 기간 만료:  R(${isValidRefreshToken})`);
      res.clearCookie("accessToken");
      return res.status(409).json({ error: "로그인 기간 만료" });
    }

    // accessToken이 만료되었지만 유효한 refreshToken을 가지고 있는 경우 newAccessToken 발급
    if (!isValidAccessToken && isValidRefreshToken) {
      console.log(`accessToken 재발급: A(${isValidRefreshToken}), R(${isValidRefreshToken})`);
      // newAccessToken 발급 및 쿠키 설정
      const accessToken = createAccessToken(requestedUserId, accessTokenSecretKey, isRememberMeBefore);

      const beforeRememberMeData = isRememberMeBefore;
      if (isRememberMe || beforeRememberMeData) {
        console.log(`자동 로그인: accessToken 쿠키에 저장 userId - ${requestedUserId}`);
        res.cookie("accessToken", accessToken);
      }
    }

    // 유효한 accessToken을 가지고 있는 경우 로그인
    // accessToken 발급
    const accessToken = createAccessToken(userId, accessTokenSecretKey, isRememberMe);

    console.log(`로그인 성공: userId - [${requestedUser.userId}]`);
    return res.status(200).json({
      message: "로그인되었습니다.",
      userId: requestedUser.userId,
      accessToken,
      nickname: requestedUser.nickname,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "로그인 중 오류가 발생했습니다." });
  }
});

app.post("/api/protected/edit", (req, res) => {
  console.log(req.path);
  const userData = res.locals;
  // 인증된 클라이언트에게만 허용된 로직
  res.status(200).json(userData);
});

//로그아웃
app.post("/api/protected/users/signout", async (req, res) => {
  console.log(req.path);
  try {
    const { userId } = res.locals;
    console.log(`로그아웃 시도: userId - [${userId}]`);

    // 클라이언트의 db에 존재하는 refreshToken 데이터 초기화
    const updatedUser = await User.findOneAndUpdate(
      { userId },
      { tokenExpiresAt: "", refreshToken: "" },
      { new: true } // 옵션을 설정하여 업데이트된 결과를 반환
    );

    // 로그아웃 성공 시
    if (updatedUser) {
      console.log(`로그아웃 성공: userId - [${userId}]`);
      res.clearCookie("accessToken"); // 클라이언트 쿠키 초기화
      return res.status(200).json({ message: "로그아웃 되었습니다." });
    } else {
      // 로그아웃 실패 시
      return res.status(400).json({ error: "로그아웃에 실패하였습니다." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "서버 오류가 발생하였습니다." });
  }
});

//회원 탈퇴
app.delete("/api/protected/users/:userId/withdraw", async (req, res) => {
  console.log(req.path);
  try {
    const { userId } = res.locals;
    console.log(`회원탈퇴 시도: userId - [${userId}]`);

    // db에 존재하는 user 데이터 삭제
    await User.deleteOne({ userId });

    // 클라이언트 쿠키 정리
    res.clearCookie("accessToken");
    console.log(`회원탈퇴 성공: userId - [${userId}]`);
    res.status(200).json({ message: `${userId}님의 회원탈퇴가 완료되었습니다.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "회원탈퇴 작업 수행 중 문제가 발생하였습니다." });
  }
});

// 게시판 조회
app.get("/api/posts", async (req, res) => {
  console.log(req.path);
  try {
    console.log(`게시판 조회 시도`);
    const posts = await Post.find();
    console.log(`게시판 조회 성공`);
    res.status(200).json({ message: `게시판 조회가 완료되었습니다.`, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "게시판 조회 작업 수행 중 문제가 발생하였습니다." });
  }
});

// 게시글 조회
app.get("/api/posts/:postId", async (req, res) => {
  console.log(req.path);
  try {
    const { postId } = req.params; // postId 값을 조회
    console.log(`게시글 조회 시도: postId - ${postId}`);
    const postResult = await Post.find({ postId });

    // 존재하지 않는 게시물인 경우
    if (!postResult) {
      res.status(400).json({
        message: `
      error 게시글 조회 실패: postId - ${postId}`,
      });
    }

    console.log(`게시글 조회 성공: postId - ${postId}`);
    res.status(200).json({
      message: `게시글 ${postResult.title}(postId:${postResult.postId})의 조회가 완료되었습니다.`,
      postResult,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "게시판 조회 작업 수행 중 문제가 발생하였습니다." });
  }
});

// 게시글 작성
app.post("/api/protected/posts/create", async (req, res) => {
  console.log(req.path);
  try {
    const { title, content, isPrivate } = req.body;
    const { userId, nickname } = res.locals;
    console.log(userId);
    console.log(`게시글 작성 시도: userId - ${userId}`);

    const currentCounter = await Counter.find({ model: "Post" });
    // 작성될 게시글 정보
    const newPost = {
      postId: currentCounter[0].count + 1,
      userId,
      nickname,
      title,
      content,
      createdAt: Date.now(),
      isPrivate,
    };

    const postResult = await Post.create(newPost);
    console.log(postResult);

    // count 값 증가 후, 현재 값을 가져옴
    await Counter.findOneAndUpdate(
      { model: "Post" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );

    // 게시글 작성 성공 시
    console.log(`게시글 작성 성공: userId - ${userId}`);
    res.status(200).json({
      message: `게시글 (${title})의 작성이 완료되었습니다.`,
      post: postResult, // 작성된 게시글 정보 반환
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "게시글 작성 작업 수행 중 문제가 발생하였습니다.", result: [] });
  }
});

// 게시글 수정 권한 확인
app.get("/api/protected/posts/:postId/edit/authorization", async (req, res) => {
  console.log(req.path);
  try {
    const { userId } = res.locals;
    const { postId } = req.params; // postId 값을 조회
    console.log(`게시글 권한 확인 시도: postId - ${postId} userId - ${userId}`);

    // 게시글 조회
    const requestedPost = await Post.findOne({ postId });

    // 게시글이 존재하지 않으면 오류 응답
    if (!requestedPost) {
      return res.status(404).json({ message: "수정할 게시글을 찾을 수 없습니다." });
    }

    // 사용자 인증 및 권한 검사
    if (requestedPost.userId !== userId) {
      return res.status(403).json({ message: "게시글을 수정할 권한이 없습니다." });
    }

    console.log(`게시글 권환 확인 성공: postId - ${postId} userId - ${userId}`);
    res.status(200).json({
      message: `게시글 ${requestedPost.title}(postId:${requestedPost.postId})의 수정 권한 확인이 완료되었습니다.`,
      requestedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "게시글 수정 작업 수행 중 문제가 발생하였습니다." });
  }
});

// 게시글 수정
app.put("/api/protected/posts/:postId/edit", async (req, res) => {
  console.log(req.path);
  try {
    const { title, content, isPrivate } = req.body.toEditData;
    const { userId } = res.locals;
    const { postId } = req.params; // postId 값을 조회
    console.log(`게시글 수정 시도: postId - ${postId}`);

    // 게시글 조회
    const requestedPost = await Post.findOne({ postId });

    // 게시글이 존재하지 않으면 오류 응답
    if (!requestedPost) {
      return res.status(404).json({ message: "수정할 게시글을 찾을 수 없습니다." });
    }

    // 사용자 인증 및 권한 검사
    if (requestedPost.userId !== userId) {
      return res.status(403).json({ message: "게시글을 수정할 권한이 없습니다." });
    }

    const postResult = await Post.findOneAndUpdate({ postId }, { title, content, isPrivate });

    if (!postResult) {
      return res.status(400).json({ message: "미지의 이유로 게시글 수정에 실패하였습니다." });
    }

    console.log(`게시글 수정 성공: postId - ${postId}`);
    res.status(200).json({
      message: `게시글 ${postResult.title}(postId:${postResult.postId})의 수정이 완료되었습니다.`,
      postResult,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "게시글 수정 작업 수행 중 문제가 발생하였습니다." });
  }
});

// 게시글 삭제
app.delete("/api/protected/posts/:postId/delete", async (req, res) => {
  console.log(req.path);
  try {
    const { userId } = res.locals;
    const { postId } = req.params; // postId 값을 조회
    console.log(`게시글 삭제 시도: postId - ${postId}`);

    // 게시글 조회
    const requestedPost = await Post.findOne({ postId });

    // 게시글이 존재하지 않으면 오류 응답
    if (!requestedPost) {
      return res.status(404).json({ message: "삭제할 게시글을 찾을 수 없습니다." });
    }

    // 사용자 인증 및 권한 검사
    if (requestedPost.userId !== userId) {
      return res.status(403).json({ message: "게시글을 삭제할 권한이 없습니다." });
    }

    const postResult = await Post.findOneAndDelete({ postId });

    if (!postResult) {
      return res.status(400).json({ message: "미지의 이유로 게시글 삭제에 실패하였습니다." });
    }

    console.log(`게시글 삭제 성공: postId - ${postId}`);
    res.status(200).json({
      message: `게시글 ${postResult.title}(postId:${postResult.postId})의 삭제가 완료되었습니다.`,
      postResult,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "게시글 삭제 작업 수행 중 문제가 발생하였습니다." });
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
