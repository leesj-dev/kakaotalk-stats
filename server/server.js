const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// MongoDB 연결 설정
mongoose
  .connect("mongodb+srv://youngkmg:DyyWrOBZsnQztW9Z@kmg.z3cx8l5.mongodb.net/kmg", {
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

// 사용자 모델 정의
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

// 새로운 사용자 생성
app.post("/api/users", (req, res) => {
  console.log(req);
  const { name, email } = req.body;
  const user = new User({ name, email });

  user
    .save()
    .then(() => {
      res.status(201).json("사용자가 생성되었습니다.");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json("사용자 생성에 실패했습니다.");
    });
});

// 모든 사용자 조회
app.get("/api/users", (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json("사용자 조회에 실패했습니다.");
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});
