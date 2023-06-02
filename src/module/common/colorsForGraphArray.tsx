export const colorsForGraphArray = [
  // 파랑
  "#ff9900", // 노랑
  "#82ca30",
  "#5b84ff", // 청록
  "#67d202", // 오렌지
  "#ff7797", // 옥색
  "#3564ff", // 금색
  "#ffab19", // 보라핑크
  "#ffd000", // 핑크
  "#ff7d74", // 민트
  "#3ba701", // 민트
  "#ff5222", // 민트
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
