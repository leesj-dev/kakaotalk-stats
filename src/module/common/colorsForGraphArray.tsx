export const colorsForGraphArray = [
  "#4ab7ff", // 파랑
  "#FFCE56", // 노랑
  "#7dffff", // 청록
  "#ffaf5e", // 오렌지
  "#ff82f5", // 옥색
  "#FFD700", // 금색
  "#BA55D3", // 보라핑크
  "#FF6384", // 핑크
  "#b363ff", // 보라
  "#ff7d74", // 민트
];

export const colorsForChatroomArray = [
  "#89CFF0",
  "#A3D9A5",
  "#F9B4C3",
  "#FBE396",
  "#FED8B1",
  "#D3D3D3",
  "#C9A0DC",
];

export const setRotationColor = (currentSpeakerIndex: number) => {
  return currentSpeakerIndex === 0
    ? "#8884d8"
    : colorsForGraphArray[(currentSpeakerIndex - 1) % colorsForGraphArray.length];
};

export const customTickColor = (isDarkMode: boolean) => {
  return isDarkMode
    ? { fontWeight: 100, stroke: "white", strokeWidth: 0.5 }
    : { fontWeight: 100, stroke: "black", strokeWidth: 0.5 };
};
