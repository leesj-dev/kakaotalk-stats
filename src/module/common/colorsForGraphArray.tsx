export const colorsForGraphArray = [
  // 파랑
  "#5b84ff",
  "#ffdd57",
  "#ff5410",
  "#ff9900",
  "#97d202",
  "#3564ff",
  "#ffab19",
  "#ffd118",
  "#3ba701",
  "#4a39ff",
  "#20d2ff",
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

export const customTickColor = { fontWeight: 100, stroke: `var(--mainText)`, strokeWidth: 0.5 };
