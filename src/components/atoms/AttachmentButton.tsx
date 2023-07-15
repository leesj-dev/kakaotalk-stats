import React from "react";
import styled from "styled-components";
import { borderRadius } from "../../style/specifiedCss/borderRadius";

const AttachmentButtonBox = styled.div`
  display: inline-block;
`;

const Label = styled.label``;

const FileInput = styled.input`
  display: none;
`;

const UnderlineP = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  color: #fff;
  background: var(--mainBlue);
  padding: 1.5rem 4rem;
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
        <UnderlineP>{children}</UnderlineP>
      </Label>
    </AttachmentButtonBox>
  );
};

export default AttachmentButton;
