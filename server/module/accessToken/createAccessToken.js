const jwt = require("jsonwebtoken");

const EXPIRATION_TIME = "10s";

exports.createAccessToken = (userId, isRememberMe, accessTokenSecretKey) => {
  const expiresIn = EXPIRATION_TIME;
  return jwt.sign({ userId, isRememberMe }, accessTokenSecretKey, {
    expiresIn,
    issuer: "young",
  });
};
