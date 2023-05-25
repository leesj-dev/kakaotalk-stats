import styled from "styled-components";
import Span from "../atoms/Span";

const Container = styled.div`
  padding: 20px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  border: 1px solid #555;
`;

const GraphInformation = ({ unit, value }: { unit: string; value: string }) => {
  return (
    <Container>
      <Span>{unit}</Span>
      <Span>{value}</Span>
    </Container>
  );
};

export default GraphInformation;
