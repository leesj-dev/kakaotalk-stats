export const colorsForGraphArray = [
  "#36A2EB", // 파랑
  "#FFCE56", // 노랑
  "#4BC0C0", // 청록
  "#FF9F40", // 오렌지
  "#00CED1", // 옥색
  "#FFD700", // 금색
  "#BA55D3", // 보라핑크
  "#FF6384", // 핑크
  "#8A2BE2", // 보라
  "#3CB371", // 민트
];

export const setRotationColor = (currentSpeakerIndex: number) => {
  return currentSpeakerIndex === 0
    ? "#8884d8"
    : colorsForGraphArray[(currentSpeakerIndex - 1) % colorsForGraphArray.length];
};
