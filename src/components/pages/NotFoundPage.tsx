import styled from "styled-components";
import { FlexCenterDiv } from "../atoms/FlexDiv";

const NotFoundContainer = styled(FlexCenterDiv)`
  height: 80vh;
  font-size: 3rem;
`;

const NotFoundPage = () => {
  return (
    <NotFoundContainer
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      404 ERROR: 존재하지 않는 페이지입니다. <br /> <br />
      준비중인 화면입니다.
    </NotFoundContainer>
  );
};

export default NotFoundPage;
