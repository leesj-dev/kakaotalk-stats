import React from "react";
import styled from "styled-components";
import { borderRadius } from "../../style/specifiedCss/borderRadius";
import { FlexCenterDiv } from "./FlexDiv";

const AttachmentButtonBox = styled.div`
  display: inline-block;
  height: 100%;
`;

const Label = styled.label``;

const FileInput = styled.input`
  display: none;
`;

const Button = styled(FlexCenterDiv)`
  padding: 1.5rem 3rem;
  font-size: 1.6rem;
  height: 100%;
  font-weight: 500;
  color: #fff;
  word-break: keep-all;
  background: var(--mainBlue);
  border-radius: ${borderRadius.weak};
  transition: background 0.3s;
  cursor: pointer;

  &:hover {
    background: var(--mainBlueHover);
  }
`;

interface AttachmentButtonProps {
  children: React.ReactNode; // children prop을 추가
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AttachmentButton: React.FC<AttachmentButtonProps> = ({ children, onChange }) => {
  return (
    <AttachmentButtonBox>
      <Label>
        <FileInput type="file" id="file" onChange={onChange} multiple />
        <Button>{children}</Button>
      </Label>
    </AttachmentButtonBox>
  );
};

export default AttachmentButton;
