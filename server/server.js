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

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../build")));
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/protected", authenticateToken(accessTokenSecretKey));

app.use("/api/users", userRouter);
app.use("/api/protected/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/protected/posts", postRouter);

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

// 대댓글 작성 (기능 미구현)
// app.post("/api/comments/:commentId/replies", async (req, res) => {
//   try {
//     const { commentId } = req.params;
//     const { comment, author } = req.body;

//     const parentComment = await Comment.findById(commentId);
//     if (!parentComment) {
//       return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
//     }

//     const newReply = { comment, author };
//     parentComment.replies.push(newReply);
//     await parentComment.save();

//     res.status(201).json(parentComment);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "서버 에러" });
//   }
// });

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
