const mongoose = require("mongoose");

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

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
