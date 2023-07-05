import styled from "styled-components";
import { WrapperProps } from "../../@types/index.d";
const WrapperStyle = styled.div`
  color: ${(props) => props.theme.mainText};
  background: ${(props) => props.theme.mainBackground};
  transition: 0.3s;
`;
const Wrapper = ({ children }: WrapperProps) => {
  return <WrapperStyle>{children}</WrapperStyle>;
};
export default Wrapper;
