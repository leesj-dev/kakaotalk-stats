import React from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 400px;
`;

const FormGroup = styled.form`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  display: block;
  font-size: 14px;
  font-weight: bold;
`;

const Input = styled.input`
  margin-bottom: 5px;
  padding: 8px 12px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

const Textarea = styled.textarea`
  margin-bottom: 5px;
  padding: 8px 12px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  resize: vertical;
`;

const Checkbox = styled.input`
  margin-bottom: 5px;
`;
// 버튼 스타일
const Button = styled.button`
  padding: 8px 12px;
  display: inline-block;
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
interface PostProps {
  createPostTest: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  edit: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  isPrivateContent: boolean;
  setIsPrivateContent: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostForm = ({
  createPostTest,
  title,
  setTitle,
  content,
  isPrivateContent,
  setIsPrivateContent,
  edit,
}: PostProps) => {
  return (
    <FormContainer>
      <FormGroup onSubmit={(e) => createPostTest(e)}>
        <Label>제목</Label>
        <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Label>내용</Label>
        <Textarea value={content} onChange={(e) => edit(e.target.value)} />
        <Label>비밀글</Label>
        <Checkbox
          type="checkBox"
          checked={isPrivateContent}
          onChange={(e) => setIsPrivateContent(e.target.checked)}
        ></Checkbox>
        <Button type="submit">글쓰기</Button>
      </FormGroup>
    </FormContainer>
  );
};

export default PostForm;
