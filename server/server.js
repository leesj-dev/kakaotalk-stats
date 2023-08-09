const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: "../.env" });
const { authenticateToken } = require("./module/accessToken/authenticateToken");
const { cleanUpExpiredTokens } = require("./module/accessToken/cleanUpExpiredTokens");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { convertToKrTime } = require("./utilities/convertToKrTime");
const { User } = require("./models/User");
const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");
const Post = require("./models/Post");
const Comment = require("./models/Comment");

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

const autoIncrementSchema = new mongoose.Schema({
  model: String, // Auto-increment를 적용할 대상 컬렉션의 이름
  field: String, // Auto-increment를 적용할 필드의 이름
  count: { type: Number, default: 0 }, // 현재까지 사용된 숫자 카운트
});

// 모델 정의
const Counter = mongoose.model("Counter", autoIncrementSchema);

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../build")));
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/protected", authenticateToken(accessTokenSecretKey));

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

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

    console.log(`게시글 권한 확인 성공: postId - ${postId} userId - ${userId}`);
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

// 댓글 수정 권한 확인
app.get("/api/protected/posts/:postId/comments/:commentId/authorization", async (req, res) => {
  console.log(req.path);
  try {
    const { commentId } = req.params;
    const { userId } = res.locals;
    console.log(`댓글 수정 권한 확인 시도: commentId - ${commentId} userId - ${userId}`);

    // 댓글 조회
    const requestedComment = await Comment.findById(commentId);

    // 댓글이 존재하지 않으면 오류 응답
    if (!requestedComment) {
      return res.status(404).json({ message: "수정할 댓글을 찾을 수 없습니다." });
    }

    // 사용자 인증 및 권한 검사
    if (requestedComment.userId !== userId) {
      return res.status(403).json({ message: "댓글을 수정할 권한이 없습니다." });
    }

    console.log(`댓글 권한 확인 성공: commentId - ${commentId} userId - ${userId}`);
    res.status(200).json({
      message: `댓글 ${requestedComment.title}(commentId:${requestedComment.commentId})의 수정 권한 확인이 완료되었습니다.`,
      requestedComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "댓글 수정 작업 수행 중 문제가 발생하였습니다." });
  }
});

// 댓글 수정
app.put("/api/protected/posts/:postId/comments/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const { comment, isPrivateComment } = req.body;
    const { userId } = res.locals;

    // 요청 데이터에 내용이 없는 경우
    if (!comment) {
      return res.status(400).json({ status: "400-2", error: "댓글을 입력해야 합니다." });
    }

    const requestedComment = await Comment.findById(commentId);

    // 댓글 작성자와 로그인한 사용자가 일치하는지 확인
    if (requestedComment.userId !== userId) {
      return res.status(403).json({ message: "댓글을 삭제할 권한이 없습니다." });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { comment, isPrivate: isPrivateComment },
      { new: true }
    );

    // 업데이트할 댓글이 존재하지 않을 경우
    if (!updatedComment) {
      return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
    }

    console.log(`댓글 수정 성공: commentId - ${commentId}`);
    res.status(200).json({
      message: `게시글 ${updatedComment.title}(commentId:${updatedComment.commentId})의 수정이 완료되었습니다.`,
      comment: updatedComment,
    });
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
  cleanUpExpiredTokens();
}, 10 * 60 * 1000);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});
