import styled from "styled-components";

const Unit = styled.span`
  padding-bottom: 5px;
  margin-bottom: 5px;
  font-size: 15px;
  font-weight: 400;
  color: #333;
  border-bottom: 1px solid #555;
`;

const UnitSpan = ({ unit }: { unit: string }) => {
  return <Unit>{unit}</Unit>;
};

export default UnitSpan;
