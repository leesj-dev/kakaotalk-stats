const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../../.env" });

exports.authenticateToken = (accessTokenSecretKey) => (req, res, next) => {
  // 헤더에서 토큰 가져오기
  const accessToken = req.headers.authorization;

  // 토큰이 없는 경우
  if (!accessToken) {
    return res.status(401).json({ error: "토큰이 필요합니다." });
  }

  // 토큰 검증
  jwt.verify(accessToken, accessTokenSecretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "유효하지 않은 토큰입니다." });
    }

    // 토큰이 유효한 경우, 요청 객체에 사용자 정보 추가
    req.user = decoded.userId;

    // 다음 미들웨어로 이동
    next();
  });
};
