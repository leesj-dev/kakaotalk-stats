export const getTokenFromCookie = (token: string) => {
  const tokenResult = token.split("accessToken=")[1];
  return tokenResult;
};
