import { useSelector } from "react-redux";
import styled from "styled-components";

const ImgBox = styled.img.attrs(({ src }) => ({
  src,
}))`
  width: 100%;
  height: 100%;
`;

const Img = ({ src }: { src: string[] }) => {
  const isDarkMode = useSelector((state: { isDarkModeSlice: boolean }) => state.isDarkModeSlice);
  const [lightSrc, darkSrc] = src;

  const srcAttrs = isDarkMode ? darkSrc || lightSrc : lightSrc;

  return <ImgBox src={srcAttrs} />;
};

export default Img;
