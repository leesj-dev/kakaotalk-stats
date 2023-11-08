import React from "react";
import styled from "styled-components";
const PublishBox = styled.div`
  padding: 20px 10px;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
      <SubmitButton type="submit" onClick={onSubmit}>
        {current}
      </SubmitButton>
    </PublishBox>
  );
};

export default PublishForm;
