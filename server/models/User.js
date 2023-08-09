const mongoose = require("mongoose");

// 스키마 정의
const userSchema = new mongoose.Schema({
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

const User = mongoose.model("User", userSchema);

module.exports = User;
