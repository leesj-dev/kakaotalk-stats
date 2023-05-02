import styled from "styled-components";

const Value = styled.span`
  font-size: 21px;
  color: #333;
`;

const ValueSpan = ({ value }: { value: string }) => {
  return <Value>{value}</Value>;
};

export default ValueSpan;
