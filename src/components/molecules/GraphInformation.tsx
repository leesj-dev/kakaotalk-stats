import styled from "styled-components";
import UnitSpan from "../atoms/UnitSpan";
import ValueSpan from "../atoms/ValueSpan";

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
      <UnitSpan unit={unit} />
      <ValueSpan value={value} />
    </Container>
  );
};

export default GraphInformation;
