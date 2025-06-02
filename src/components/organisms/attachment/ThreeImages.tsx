import styled from "styled-components";
import { FlexCenterDiv, FlexColumnDiv } from "../../atoms/FlexDiv";
import Img from "../../atoms/Img";
import Paragraph from "../../atoms/Paragraph";

const ThreeImagesBox = styled(FlexCenterDiv)`
  padding: 0 10px;
  gap: 30px;
  max-width: 1220px;
  height: 100%;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const ImageCardBox = styled(FlexColumnDiv)`
  flex: 1;
  height: 100%;

  @media (max-width: 1200px) {
    height: 500px;
  }
`;

const Image = styled(Img)`
  margin-bottom: 10px;
  border: 1px solid var(--border);
`;

const Description = styled(Paragraph)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export interface CardData {
  id: number;
  src: string;
  text: string;
}

interface ThreeImagesProps {
  srcAndText: CardData[];
}

const ThreeImages = ({ srcAndText }: ThreeImagesProps) => {
  return (
    <ThreeImagesBox>
      {srcAndText.map((item) => {
        return (
          <ImageCardBox key={item.id}>
            <Image src={[item.src]} />
            <Description>{item.text}</Description>
          </ImageCardBox>
        );
      })}
    </ThreeImagesBox>
  );
};

export default ThreeImages;
