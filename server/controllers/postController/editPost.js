const Post = require("../../models/Post");

const editPost = async (req, res) => {
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
};
module.exports = editPost;
