const jwt = require("jsonwebtoken");
const { verifyToken } = require("./jwtVerifyToken");
const { getTokenFromCookie } = require("./getTokenFromCookie");

exports.authenticateToken = (accessTokenSecretKey, UserModel) => async (req, res, next) => {
  console.log(req.path);
  try {
    const requestedAccessToken = getTokenFromCookie(req, res, "accessToken");
    // accessToken을 소유한 경우
    const isValidAccessToken = verifyToken(requestedAccessToken, accessTokenSecretKey);
    const decodedToken = jwt.decode(requestedAccessToken, accessTokenSecretKey);
    const requestedUserId = decodedToken.userId;
    const requestedUser = await UserModel.findOne({ userId: requestedUserId });
    const isValidRefreshToken = verifyToken(requestedUser.refreshToken, accessTokenSecretKey);

    // 유효하지 않은 토큰이거나 로그인 기간이 만료된 경우
    if (!isValidAccessToken && !isValidRefreshToken) {
      console.log(
        "isValidAccessToken:",
        isValidAccessToken,
        "isValidRefreshToken",
        isValidRefreshToken,
        "토큰 만료"
      );
      res.clearCookie("accessToken");
      // res.status(409).json({ error: "로그인 기간 만료" });
      return next();
    }

    // accessToken이 만료되었지만 유효한 refreshToken을 가지고 있는 경우 newAccessToken 발급
    if (!isValidAccessToken && isValidRefreshToken) {
      console.log(
        "isValidAccessToken:",
        isValidAccessToken,
        "isValidRefreshToken",
        isValidRefreshToken,
        "토큰 재발급"
      );
      // newAccessToken 발급
      const accessToken = jwt.sign({ userId: requestedUserId }, accessTokenSecretKey, {
        expiresIn: "10s",
        issuer: "young",
      });
      res.cookie("accessToken", accessToken);
    }

    // 다음 미들웨어로 유효한 accessToken을 소유한 user의 데이터 전달
    res.locals.userData = {
      userId: requestedUser.userId,
      nickname: requestedUser.nickname,
    };
    console.log(
      "isValidAccessToken:",
      isValidAccessToken,
      "isValidRefreshToken",
      isValidRefreshToken,
      "유효한 토큰"
    );
    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "접근불가: 토큰이 유효하지 않습니다." });
  }
};
