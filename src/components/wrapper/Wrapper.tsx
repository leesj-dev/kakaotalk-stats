import styled from "styled-components";
import { WrapperProps } from "../../@types/index.d";

const Wrap = styled.div`
  /* margin-top: 100px; */
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.mainText};
  background: ${(props) => props.theme.mainBackground};
`;

const Wrapper = ({ children }: WrapperProps) => {
  return <Wrap>{children}</Wrap>;
};

export default Wrapper;
