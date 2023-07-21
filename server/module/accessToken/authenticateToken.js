const jwt = require("jsonwebtoken");
const { verifyToken } = require("./jwtVerifyToken");
const { getTokenFromCookie } = require("./getTokenFromCookie");

exports.authenticateToken = (accessTokenSecretKey, UsersCollection) => async (req, res, next) => {
  try {
    // 헤더에서 토큰 가져오기
    const requestedRefreshToken = getTokenFromCookie(req, res, "refreshToken");
    const requestedAccessToken = getTokenFromCookie(req, res, "accessToken");

    const isValidAccessToken = verifyToken(requestedAccessToken, accessTokenSecretKey);
    const isValidRefreshToken = verifyToken(requestedRefreshToken, accessTokenSecretKey);

    const dbUser = await UsersCollection.findOne({ refreshToken: requestedRefreshToken });
    const isMatchedRefreshToken = requestedRefreshToken === dbUser.refreshToken;

    // refreshToken이 유효하지 않은 경우 접근 불가
    if (!isValidRefreshToken || !isMatchedRefreshToken) {
      return res.status(401).json({ error: "접근불가: 리프레시 토큰이 유효하지 않습니다." });
    }

    // accessToken이 유효하지 않은 경우 accessToken 재발급
    const { userId } = jwt.decode(requestedAccessToken);
    if (!isValidAccessToken) {
      const newAccessToken = jwt.sign({ userId }, accessTokenSecretKey, {
        expiresIn: "10s",
        issuer: "youngjuhee",
      });
      return res.status(200).json({
        message: "새로운 accessToken이 발급되었습니다.",
        requestedAccessToken: newAccessToken,
      });
    }

    // 유효한 accessToken을 소유한 경우
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "접근불가: 토큰이 유효하지 않습니다." });
  }
};
