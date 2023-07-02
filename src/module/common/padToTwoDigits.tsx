export const padToTwoDigits = (value: String | Number) => {
  return value.toString().padStart(2, "0");
};
