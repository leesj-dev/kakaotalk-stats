const bcrypt = require("bcryptjs");

exports.hashPassword = async (password) => {
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("비밀번호 해시화 중 오류가 발생했습니다.");
  }
};
