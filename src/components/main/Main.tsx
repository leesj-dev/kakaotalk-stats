import React, { useState } from "react";
import styled from "styled-components";
import "../../style/reset.css";
import Attachment from "./attachment/Attachment";
import Summary from "./Summary/Summary";
import { useSelector } from "react-redux";
import { AnalyzedMessage } from "../../@types/index.d";
import WordCloud from "./tagCloud/WordCloud";
import ReplyLineGraph from "./replyLineGraph/ReplyLineGraph";
import FileAttachment from "../organisms/FileAttachment";

const Container = styled.div`
  width: 600px;
  font-size: 19px;
  border: 2px solid var(--border);
  border-radius: 20px;
  box-shadow: 1px 1px 5px 1px var(--border);
  overflow: hidden;
`;

const Section = styled.div``;

const Title = styled.h1`
  padding: 20px 0;
  font-size: 24px;
  text-align: center;
  border-bottom: 2px solid var(--border);
`;

const Body = styled.p`
  padding: 50px;
  white-space: pre-line;
  line-height: 1.5;
  border-bottom: 2px solid var(--border);
`;

const OptionBox = styled.div`
  display: flex;
`;

const Option = styled.div`
  padding: 20px 0;
  display: flex;
  flex: 1;
  justify-content: center;
  transition: 0.3s;
  cursor: pointer;

  &:first-child {
    border-right: 2px solid var(--border);
  }

  &.on {
    background: ${(props) => props.theme.mainBlue};
  }

  &:hover {
  }
`;

const Box1 = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background: #2da0fa;
  color: ${(props) => props.theme.mainBlack};
  transition: 0.3s;

  &:hover {
    background: #0d6efd;
  }
`;

const Main = () => {
  const results = useSelector(
    (state: { analyzedMessagesSlice: AnalyzedMessage }) => state.analyzedMessagesSlice
  );

  const [isWindow, setIsWindow] = useState<boolean>(true);

  return (
    <div>
      <FileAttachment />
      <Container>
        <Box1>
          <span>ㅇㅅㅇㅅㅇㅅㅇㅇㅅㅇㅅㅇㅅㅇㅇㅅㅇㅅㅇㅅㅇㅇㅅㅇㅅㅇㅅㅇㅇㅅㅇㅅㅇㅅㅇ</span>
        </Box1>
        <Section>
          <Title>카카오톡 돋보기</Title>
          <Body>
            Kakao Analytics를 사용하기 위해서는
            {`\n`} 먼저 웹사이트를 등록해야 합니다.
            {`\n`} 웹사이트를 등록하려면,
            {`\n`} Kakao Analytics 콘솔에 로그인한 후{`\n`} "웹사이트 추가" 버튼을 클릭합니다.
            {`\n`} 그런 다음, 웹사이트의 이름,
            {`\n`} URL, 카테고리 등을 입력하고 등록합니다.
            {`\n`}
            {`\n`} 등록한 웹사이트에 추적 코드를 설치해야 합니다.
            {`\n`} 추적 코드는 Kakao Analytics 콘솔에서 생성할 수 있습니다.
            {`\n`} 생성한 추적 코드를 웹사이트의 모든 페이지에설치합니다.
          </Body>
        </Section>
        <Section>
          <OptionBox>
            <Option className={`${isWindow && "on"}`} onClick={() => setIsWindow(false)}>
              Window
            </Option>
            <Option className={`${!isWindow && "on"}`} onClick={() => setIsWindow(true)}>
              Mac O/S
            </Option>
          </OptionBox>
        </Section>
      </Container>
      <Attachment />
      {Array.isArray(results) && results.length !== 0 && <Summary />}
      {Array.isArray(results) && results.length !== 0 && <WordCloud />}
      {Array.isArray(results) && results.length !== 0 && <ReplyLineGraph />}
    </div>
  );
};

export default Main;
