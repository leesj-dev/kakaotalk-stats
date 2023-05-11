import React from "react";
import styled from "styled-components";

const AttachmentButtonBox = styled.div`
  display: inline-block;
`;

const Label = styled.label`
  border-radius: 30px;
`;

const FileInput = styled.input`
  display: none;
`;

const UnderlineP = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => props.theme.mainBlue};
  text-decoration: underline;
  cursor: pointer;
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
