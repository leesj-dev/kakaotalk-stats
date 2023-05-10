import React from "react";
import styled from "styled-components";
import RadiusButton from "../atoms/Button";

const Label = styled.label`
  margin: 0 auto;
  border-radius: 30px;
`;

const FileInput = styled.input`
  display: none;
`;

interface AttachmentButtonProps {
  children: React.ReactNode; // children prop을 추가
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AttachmentButton: React.FC<AttachmentButtonProps> = ({ children, onChange }) => {
  return (
    <Label>
      <FileInput type="file" id="file" onChange={onChange} multiple />
      <RadiusButton>{children}</RadiusButton>
    </Label>
  );
};

export default AttachmentButton;
