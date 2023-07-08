import styled from "styled-components";
import { WrapperProps } from "../../@types/index.d";
const WrapperStyle = styled.div`
  color: var(--mainText);
  background: var(--mainBackground);
  transition: background 0.3s;
`;
const Wrapper = ({ children }: WrapperProps) => {
  return <WrapperStyle>{children}</WrapperStyle>;
};
export default Wrapper;
