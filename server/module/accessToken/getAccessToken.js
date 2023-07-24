exports.getAccessToken = (bearerAccessToken) => {
  return bearerAccessToken.split("Bearer ")[1];
};
