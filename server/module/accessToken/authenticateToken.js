const jwt = require("jsonwebtoken");
const { verifyToken } = require("./jwtVerifyToken");
const { getTokenFromCookie } = require("./getTokenFromCookie");

exports.authenticateToken = (accessTokenSecretKey, UserModel) => async (req, res, next) => {
  console.log(`토큰 인증 시도 - ${req.path}`);
  try {
    // 유저 정보 DB 확인
    const requestedAccessToken = getTokenFromCookie(req, res, "accessToken");
    const decodedToken = jwt.decode(requestedAccessToken, accessTokenSecretKey);
    const requestedUserId = decodedToken.userId;
    const requestedUser = await UserModel.findOne({ userId: requestedUserId });

    // accessToken 및 refreshToken 검증
    const isValidAccessToken = verifyToken(requestedAccessToken, accessTokenSecretKey);
    const isValidRefreshToken = verifyToken(requestedUser.refreshToken, accessTokenSecretKey);

    // 유효하지 않은 토큰이거나 로그인 기간이 만료된 경우
    if (!isValidAccessToken && !isValidRefreshToken) {
      console.log(`토큰 만료: A(${isValidAccessToken}) & R(${isValidRefreshToken})`);
      // 만료된 토큰일 경우, 쿠키에서 accessToken 제거
      res.clearCookie("accessToken");
      return res.status(401).json({ error: "로그인 기간 만료" });
    }

    // accessToken 만료 + 유효한 refreshToken인 경우, 새로운 accessToken 발급 및 쿠키 설정
    if (!isValidAccessToken && isValidRefreshToken) {
      console.log(`토큰 재발급: A(${isValidAccessToken}) & R(${isValidRefreshToken})`);
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
    console.log(`유효한 토큰: A(${isValidAccessToken}) & R(${isValidRefreshToken})`);

    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "접근불가: 토큰이 유효하지 않습니다." });
  }
};
