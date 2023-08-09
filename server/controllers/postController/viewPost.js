const Post = require("../../models/Post");
const { getAccessToken } = require("../../module/accessToken/getAccessToken");
const jwt = require("jsonwebtoken");

const viewPost = async (req, res) => {
  console.log(req.path);
  try {
    const accessToken = req.headers.authorization && getAccessToken(req.headers.authorization);
    const decodedToken = jwt.decode(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
    const requestedUserId = decodedToken && decodedToken.userId;

    const { postId } = req.params; // postId 값을 조회
    console.log(`게시글 조회 시도: postId - ${postId}`);
    const post = await Post.findOne({ postId });

    // 존재하지 않는 게시물인 경우
    if (!post) {
      return res.status(404).json({
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
};

module.exports = viewPost;
