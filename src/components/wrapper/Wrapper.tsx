import styled from "styled-components";
import { WrapperProps } from "../../@types/index.d";
const Wrap = styled.div`
  color: ${(props) => props.theme.mainText};
  background: ${(props) => props.theme.mainBackground};
`;
const Wrapper = ({ children }: WrapperProps) => {
  return <Wrap>{children}</Wrap>;
};
export default Wrapper;
