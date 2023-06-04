export const colorsForGraphArray = [
  // 파랑
  "#5b84ff",
  "#ffdd57",
  "#82ca30",
  "#ff9900",
  "#97d202",
  "#3564ff",
  "#ffab19",
  "#ff5222",
  "#3ba701",
  "#4a39ff",
  "#ffd000",
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
