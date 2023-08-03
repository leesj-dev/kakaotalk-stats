import React from "react";
import styled from "styled-components";
interface CommentProps {
  comment: string;
  isPrivateComment: boolean;
  handleWriteComment: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handlePrivateCommentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitComment: (e: React.MouseEvent<HTMLButtonElement>, currentPost: any) => void;
  currentPost: any;
}

const Label = styled.label`
  margin-bottom: 5px;
  display: block;
  font-size: 14px;
  font-weight: bold;
`;

const CommentFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  width: 100%;
`;

const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;
`;

const CheckBox = styled.input`
  margin-right: 5px;
`;

const SubmitCommentButton = styled.button``;

const CommentForm = ({
  comment,
  isPrivateComment,
  handleWriteComment,
  handlePrivateCommentChange,
  handleSubmitComment,
  currentPost,
}: CommentProps) => {
  return (
    <CommentFormContainer>
      <TextArea
        value={comment}
        onChange={(e) => handleWriteComment(e)}
        placeholder="댓글을 입력하세요"
      />
      <CheckBoxWrapper>
        <Label>비밀글</Label>
        <CheckBox
          type="checkbox"
          checked={isPrivateComment}
          onChange={(e) => handlePrivateCommentChange(e)}
        />
      </CheckBoxWrapper>
      <SubmitCommentButton onClick={(e) => handleSubmitComment(e, currentPost)}>
        댓글 작성하기
      </SubmitCommentButton>
    </CommentFormContainer>
  );
};

export default CommentForm;
