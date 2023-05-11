import styled from "styled-components";

const Img = styled.img.attrs((props) => ({
  src: props.src,
}))`
  width: 100%;
  height: 100%;
`;

export default Img;
