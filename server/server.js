const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: "../.env" });
const { hashPassword } = require("./module/hashPassword/hashPassword");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./module/accessToken/authenticateToken");
const { cleanUpExpiredTokens } = require("./module/accessToken/cleanUpExpiredTokens");
const cookieParser = require("cookie-parser");
const { verifyToken } = require("./module/accessToken/jwtVerifyToken");
const { getTokenFromCookie } = require("./module/accessToken/getTokenFromCookie");
const bodyParser = require("body-parser");
const { createAccessToken } = require("./module/accessToken/createAccessToken");
const { convertToKrTime } = require("./utilities/convertToKrTime");
const { getAccessToken } = require("./module/accessToken/getAccessToken");

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

// 스키마 정의
const userSchema = new kmgDB.Schema({
  userId: {
    type: String,
    required: [true, "아이디를 입력하세요."],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "패스워드를 입력하세요."],
    trim: true,
  },
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
  createdAt: { type: String, default: Date.now().toLocaleString("ko-KR") },
  isPrivate: { type: Boolean, default: false },
});

const autoIncrementSchema = new mongoose.Schema({
  model: String, // Auto-increment를 적용할 대상 컬렉션의 이름
  field: String, // Auto-increment를 적용할 필드의 이름
  count: { type: Number, default: 0 }, // 현재까지 사용된 숫자 카운트
});

const commentSchema = new mongoose.Schema({
  postId: { type: Number, ref: "Post", required: true },
  comment: { type: String, required: true },
  userId: { type: String, ref: "User", required: true },
  nickname: { type: String, ref: "User", required: true },
  isPrivate: { type: Boolean, default: false },
  createdAt: { type: String, default: Date.now().toLocaleString("ko-KR") },
  replies: [
    {
      parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: true },
      comment: { type: String, required: true },
      userId: { type: String, ref: "User", required: true },
      nickname: { type: String, ref: "User", required: true },
      isPrivate: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

// 모델 정의
const User = kmgDB.model("User", userSchema);
const Post = kmgDB.model("Post", postSchema);
const Counter = mongoose.model("Counter", autoIncrementSchema);
const Comment = mongoose.model("Comment", commentSchema);

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

    const foundUserByRequestedUserId = await User.findOne({ userId });
    const foundUserByRequestedNickname = await User.findOne({ nickname });

    // 패스워드에 알 수 없는 문자가 포함된 경우
    const isValidPassword = /^[a-zA-Z가-힣!@#$%^&*()_+|<>?:{}]*.{4,16}$/.test(password);
    if (!isValidPassword) {
      return res.status(400).json({ error: `패스워드에 알 수 없는 문자가 포함되어 있습니다.` });
    }

    // userId의 형식이 올바르지 않은 경우
    const isValidUserId = /^[a-zA-Z0-9]{4,16}$/.test(userId);
    if (!isValidUserId) {
      return res
        .status(400)
        .json({ error: `${userId}' 아이디는 4 ~ 16자의 영문, 숫자 조합으로 입력해야 합니다.` });
    }

    // nickname 형식이 올바르지 않은 경우
    const isValidNickname = /^[가-힣a-zA-Z0-9]{2,10}$/.test(nickname);
    if (!isValidNickname) {
      return res
        .status(400)
        .json({ error: `${nickname}' 닉네임은 2 ~ 10자의 한글, 영문, 숫자 조합으로 입력해야 합니다.` });
    }

    // 이미 존재하는 userId와 nickname인 경우
    if (foundUserByRequestedUserId && foundUserByRequestedNickname) {
      return res.status(409).json({
        status: "409-3",
        error: `'${foundUserByRequestedUserId.userId}' '${foundUserByRequestedNickname.nickname}'는 이미 사용 중입니다.`,
      });
    }

    // 이미 존재하는 userId인 경우
    if (foundUserByRequestedUserId) {
      return res.status(409).json({
        status: "409-1",
        error: "이미 사용중인 아이디입니다",
      });
    }

    // 이미 존재하는 nickname인 경우
    if (foundUserByRequestedNickname) {
      return res.status(409).json({
        status: "409-2",
        error: " 이미 사용중인 닉네임입니다",
      });
    }

    const hashedPassword = await hashPassword(password);
    const newUserData = new User({ userId, password: hashedPassword, nickname });
    await newUserData.save();

    // 회원 가입 성공
    console.log(`회원가입 성공 - ID: [${userId}] Nickname: [${nickname}]`);
    res.status(201).json({ message: "회원 가입이 완료되었습니다." });
  } catch (error) {
    // 이외의 예상치 못한 오류
    console.error(error);
    res.status(500).json({ error: "회원 가입 중 오류가 발생했습니다." });
  }
});

// 로그인
app.post("/api/users/login", async (req, res) => {
  console.log(req.path);

  try {
    // user 데이터 확인
    let requestedAccessToken;
    if (req.headers && req.headers.cookie) {
      requestedAccessToken = getTokenFromCookie(req, res, "accessToken");
    }
    // if (req.headers && req.headers.cookie) {
    //   const requestedAccessToken = getTokenFromCookie(req, res, "accessToken");
    // }

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
    const accessToken = req.headers.authorization && getAccessToken(req.headers.authorization);
    const decodedToken = jwt.decode(accessToken, accessTokenSecretKey);
    const requestedUserId = decodedToken && decodedToken.userId;

    const { postId } = req.params; // postId 값을 조회
    console.log(`게시글 조회 시도: postId - ${postId}`);
    const post = await Post.findOne({ postId });

    // 존재하지 않는 게시물인 경우
    if (!post) {
      res.status(404).json({
        message: `게시글 조회 실패: postId - ${postId}`,
      });
    }

    const isSameAuthor = post.userId === requestedUserId;

    console.log(`게시글 조회 성공: postId - ${postId}`);
    res.status(200).json({
      message: `게시글 ${post.title}(postId:${post.postId})의 조회가 완료되었습니다.`,
      post,
      isSameAuthor,
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

    console.log(`게시글 작성 시도: userId - ${userId}`);

    // 작성될 게시글 정보
    const currentCounter = await Counter.find({ model: "Post" });
    const newPost = {
      postId: currentCounter[0].count + 1,
      userId,
      nickname,
      title,
      content,
      createdAt: convertToKrTime(new Date()), // 현재 시간을 한국 시간으로 변환하여 저장
      isPrivate,
    };

    const postResult = await Post.create(newPost);

    // count 값 증가 후, 현재 값을 가져옴
    await Counter.findOneAndUpdate(
      { model: "Post" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );

    // 게시글 작성 성공
    console.log(`게시글 작성 성공: userId - ${userId}`);
    res.status(200).json({
      message: `게시글 (${title})의 작성이 완료되었습니다.`,
      post: postResult,
    });
  } catch (error) {
    if (error._message === "Post validation failed") {
      return res.status(400).json({ message: "글 제목 또는 내용을 입력해야 합니다." });
    }

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
    const { title, content, isPrivate } = req.body;
    const { userId } = res.locals;
    const { postId } = req.params; // postId 값을 조회
    console.log(`게시글 수정 시도: postId - ${postId}`);

    // 게시글 조회
    const requestedPost = await Post.findOne({ postId });

    // 요청 데이터에 제목이 없는 경우
    if (!title) {
      return res.status(400).json({ status: "400-1", error: "제목을 입력해야 합니다." });
    }

    // 요청 데이터에 내용이 없는 경우
    if (!content) {
      return res.status(400).json({ status: "400-2", error: "본문을 입력해야 합니다." });
    }

    // 게시글이 존재하지 않으면 오류 응답
    if (!requestedPost) {
      return res.status(404).json({ message: "수정할 게시글을 찾을 수 없습니다." });
    }

    // 사용자 인증 및 권한 검사
    if (requestedPost.userId !== userId) {
      return res.status(403).json({ message: "게시글을 수정할 권한이 없습니다." });
    }

    const updatedPost = await Post.findOneAndUpdate({ postId }, { title, content, isPrivate });

    console.log(`게시글 수정 성공: postId - ${postId}`);
    res.status(200).json({
      message: `게시글 ${updatedPost.title}(postId:${updatedPost.postId})의 수정이 완료되었습니다.`,
      post: updatedPost,
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
      return res.status(404).json({ message: "이미 삭제된 게시글입니다." });
    }

    // 사용자 인증 및 권한 검사
    if (requestedPost.userId !== userId) {
      return res.status(403).json({ message: "게시글을 삭제할 권한이 없습니다." });
    }

    // 게시글 삭제
    const deletedPost = await Post.findOneAndDelete({ postId });

    console.log(`게시글 삭제 성공: postId - ${postId}`);
    res.status(200).json({
      message: `게시글 ${deletedPost.title}(postId:${deletedPost.postId})의 삭제가 완료되었습니다.`,
      post: deletedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "게시글 삭제 작업 수행 중 문제가 발생하였습니다." });
  }
});

// 게시물의 댓글 조회
app.get("/api/posts/:postId/comments", async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId });

    if (!comments) {
      return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
    }

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 에러" });
  }
});

// 댓글 작성
app.post("/api/protected/posts/:postId/comments", async (req, res) => {
  console.log(req.path);
  try {
    const { comment, isPrivateComment } = req.body;
    const { userId, nickname } = res.locals;
    const { postId } = req.params;
    console.log(`댓글 작성 시도: userId - ${userId}`);

    // 요청 데이터에 내용이 없는 경우
    if (!comment) {
      return res.status(400).json({ status: "400-2", error: "댓글을 입력해야 합니다." });
    }

    console.log(comment, "?");

    const newComment = await Comment.create({
      postId,
      comment,
      userId,
      nickname,
      isPrivateComment,
      createdAt: convertToKrTime(new Date()),
    });

    // 댓글 작성 성공
    console.log(`댓글 작성 성공: userId - ${userId}`);
    res.status(200).json({
      message: `댓글 (${comment})의 작성이 완료되었습니다.`,
      comment: newComment,
    });
  } catch (error) {
    console.log(error);
    if (error._message === "Comment validation failed") {
      return res.status(400).json({ message: "댓글 내용을 입력해야 합니다." });
    }

    console.error(error);
    res.status(500).json({ message: "서버 에러" });
  }
});

// 댓글 수정
app.put("/api/comments/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const { comment } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(commentId, { comment }, { new: true });

    if (!updatedComment) {
      return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 에러" });
  }
});

// 대댓글 작성
app.post("/api/comments/:commentId/replies", async (req, res) => {
  try {
    const { commentId } = req.params;
    const { comment, author } = req.body;

    const parentComment = await Comment.findById(commentId);
    if (!parentComment) {
      return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
    }

    const newReply = { comment, author };
    parentComment.replies.push(newReply);
    await parentComment.save();

    res.status(201).json(parentComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 에러" });
  }
});

// 댓글 삭제
app.delete("/api/protected/posts/:postId/comments/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId } = res.locals;
    console.log(`댓글 삭제 시도: userId - ${userId}, commentId - ${commentId}`);

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
    }

    // 댓글 작성자와 로그인한 사용자가 일치하는지 확인
    if (comment.userId !== userId) {
      return res.status(403).json({ message: "댓글을 삭제할 권한이 없습니다." });
    }

    await Comment.findByIdAndDelete(commentId);

    console.log(`댓글 삭제 완료: userId - ${userId}`);
    res.status(200).json({ message: "댓글이 삭제되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 에러" });
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
