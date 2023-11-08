const Counter = require("../../models/Counter");
const Post = require("../../models/Post");
const { convertToKrTime } = require("../../utilities/convertToKrTime");

const createPost = async (req, res) => {
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
};

module.exports = createPost;
