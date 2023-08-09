const User = require("../../models/User");

const withdrawUser = async (req, res) => {
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
};
module.exports = withdrawUser;
