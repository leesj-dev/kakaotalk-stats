const User = require("../../models/User");

const logOutUser = async (req, res) => {
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
};

module.exports = logOutUser;
