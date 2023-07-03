import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AttachmentButton from "../../atoms/AttachmentButton";
import Paragraph from "../../atoms/Paragraph";
import OsList from "./OsList";
import { FlexColumnCenterDiv } from "../../atoms/FlexDiv";
import { borderRadius } from "../../../style/css/borderRadius";

const DropBox = styled(FlexColumnCenterDiv)`
  position: relative;
  width: 80%;
  height: 420px;
  padding: 8rem 2rem;
  margin: 0 auto 30px auto;
  width: 80%;
  border: 2px dashed ${(props) => props.theme.mainGray};
  border-radius: ${borderRadius.strong};
  transition: 0.3s;

  > * {
    margin-bottom: 10px;
    font-weight: 300;
  }
`;

const OsListBox = styled.div`
  margin-bottom: 3rem;
`;

const TextContentBox = styled(FlexColumnCenterDiv)``;

const AttachGuide = styled(FlexColumnCenterDiv)`
  margin-bottom: 1.5rem;
`;

const AttachmentBox = styled.div`
  margin-bottom: 1rem;
  display: flex;
  gap: 5px;
`;

const Notice = styled(Paragraph)`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${(props) => props.theme.mainBlueHover};
`;

type DropZoneProps = {
  handleChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileDrop = ({ handleChangeFile }: DropZoneProps) => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <DropBox>
      <OsListBox>
        <OsList />
      </OsListBox>
      {screenWidth > 769 ? (
        <TextContentBox>
          <AttachGuide>
            <Paragraph>카카오톡 텍스트 파일을 드래그하여 끌어 놓거나,</Paragraph>
            <Paragraph>아래의 파일 첨부하기 버튼을 눌러 카카오톡 대화 파일을 첨부해주세요.</Paragraph>
          </AttachGuide>

          <AttachmentBox>
            <AttachmentButton onChange={handleChangeFile}>파일 첨부하기</AttachmentButton>
          </AttachmentBox>
        </TextContentBox>
      ) : (
        <TextContentBox>
          <AttachGuide>
            <Paragraph>아래의 파일 첨부하기 버튼을 눌러 카카오톡 대화 파일을 첨부해주세요.</Paragraph>
          </AttachGuide>
          <AttachmentBox>
            <AttachmentButton onChange={handleChangeFile}>파일 첨부하기</AttachmentButton>
          </AttachmentBox>
        </TextContentBox>
      )}
      <Notice>* 올바른 운영체제를 선택하지 않으면 분석이 불가능합니다.</Notice>
    </DropBox>
  );
};

export default FileDrop;
