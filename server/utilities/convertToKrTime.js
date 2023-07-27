// 한국 시간으로 변환하는 함수
exports.convertToKrTime = (date) => {
  const utcMilliseconds = date.getTime();
  const kstMilliseconds = utcMilliseconds;
  return new Date(kstMilliseconds).toLocaleString("ko-KR");
};
