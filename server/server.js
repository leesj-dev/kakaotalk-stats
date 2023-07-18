const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

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

// user를 DB에 저장합니다.
app.post("/api/users/create", (req, res) => {
  const { userId, password, nickname } = req.body;
  const newUser = new User({ userId, password, nickname });

  newUser
    .save()
    .then(() => {
      // 회원 가입 성공
      res.status(200).json({ message: "회원 가입이 완료되었습니다." });
    })
    .catch((err) => {
      // 중복된 아이디나 닉네임인 경우 처리
      if (err.code === 11000) {
        const key = Object.keys(err.keyValue)[0];
        const value = err.keyValue[key];
        console.error(err, `error[11000]: 중복된 아이디나 닉네임 에러`);
        res.status(409).json({ error: `${key} '${value}'는 이미 사용 중입니다.` });
      } else {
        // 기타 오류 처리
        res.status(500).json({ error: "회원 가입 중 오류가 발생했습니다." });
      }
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});
