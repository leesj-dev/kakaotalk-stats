/**
 * 쿠키에서 특정 토큰을 추출하는 함수입니다.
 *
 * @param {Object} req - 요청 객체
 * @param {Object} res - 응답 객체
 * @param {string} token - 추출할 토큰의 이름 ex1) accessToken, ex2) refreshToken
 * @returns {string|null} 추출된 토큰 값 또는 null (토큰이 존재하지 않을 경우)
 * @throws {Error} 오류가 발생할 경우 예외를 던집니다.
 */
exports.getTokenFromCookie = (req, res, token) => {
  console.log(req.headers);
  try {
    const tokenForm = `${token}=`;
    const tokenResult =
      req.headers.cookie &&
      req.headers.cookie
        .split("; ")
        .find((cookieData) => cookieData.slice(0, 13).includes(tokenForm))
        .split(tokenForm)[1];
    return tokenResult ? tokenResult : "";
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "접근불가: 토큰이 유효하지 않습니다." });
  }
};
