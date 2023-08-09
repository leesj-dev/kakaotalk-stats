import React from "react";
import styled from "styled-components";
const PublishBox = styled.div`
  padding: 20px;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  display: block;
  font-size: 14px;
  font-weight: bold;
`;

const CheckBox = styled.input`
  margin-bottom: 5px;
`;

const SubmitButton = styled.button`
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }
`;

interface PublishProps {
  isChecked: any;
  onCheckboxChange: any;
  current: any;
  onSubmit: any;
}

const PublishForm = ({ isChecked, onCheckboxChange, onSubmit, current }: PublishProps) => {
  return (
    <PublishBox>
      <CheckBoxWrapper>
        <Label>비밀글</Label>
        <CheckBox type="checkbox" checked={isChecked} onChange={onCheckboxChange} />
      </CheckBoxWrapper>
      <SubmitButton type="submit" onClick={onSubmit}>
        {current}
      </SubmitButton>
    </PublishBox>
  );
};

export default PublishForm;
