const User = require("../../models/User");

// 만료된 토큰 정리 작업 수행 함수
exports.cleanUpExpiredTokens = async () => {
  try {
    const currentDate = new Date();
    await User.updateMany(
      { tokenExpiresAt: { $lt: currentDate } },
      { $set: { tokenExpiresAt: "", refreshToken: "" } }
    );

    console.log("만료된 토큰 정리 완료");
  } catch (error) {
    console.error("만료된 토큰 정리 중 에러:", error);
  }
};
