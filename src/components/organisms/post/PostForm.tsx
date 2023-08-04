import React from "react";
import styled from "styled-components";
import { FlexRowDiv } from "../../atoms/FlexDiv";

const FormContainer = styled.div`
  margin-bottom: 30px;
  max-width: 1200px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const TitleBox = styled.div`
  padding: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
`;

const CheckBoxWrapper = styled(FlexRowDiv)`
  gap: 10px;
`;

const PublishBox = styled(FlexRowDiv)`
  padding: 20px;
  border-top: 1px solid #ddd;
  justify-content: space-between;
  align-items: center;
`;

const FormGroup = styled.form`
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
  border: none;
  border-radius: 5px;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

const Textarea = styled.textarea`
  margin-bottom: 5px;
  padding: 8px 20px;
  width: 100%;
  height: 150px;
  resize: none;
  border: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
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
        <TitleBox>
          {/* <Label>제목</Label> */}
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 작성해주세요"
          />
        </TitleBox>

        {/* <Label>내용</Label> */}
        <Textarea
          value={content}
          onChange={(e) => edit(e.target.value)}
          placeholder="여기를 눌러서 글을 작성할 수 있습니다"
        />
        <PublishBox>
          <CheckBoxWrapper>
            <Label>비밀글</Label>
            <Checkbox
              type="checkBox"
              checked={isPrivateContent}
              onChange={(e) => setIsPrivateContent(e.target.checked)}
            />
          </CheckBoxWrapper>

          <Button type="submit">글쓰기</Button>
        </PublishBox>
      </FormGroup>
    </FormContainer>
  );
};

export default PostForm;
