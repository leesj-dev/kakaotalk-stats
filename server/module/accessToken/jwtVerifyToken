const jwt = require("jsonwebtoken");

exports.verifyToken = (token, accessTokenSecretKey) => {
  return jwt.verify(token, accessTokenSecretKey, (error) => {
    return error ? false : true;
  });
};
