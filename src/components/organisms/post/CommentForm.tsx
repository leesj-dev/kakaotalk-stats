import React, { useState } from "react";
import styled from "styled-components";
import { FlexRowDiv } from "../../atoms/FlexDiv";
import axios from "axios";
import { AccessToken } from "../../../@types/index.d";

const Label = styled.label`
  margin-bottom: 5px;
  display: block;
  font-size: 14px;
  font-weight: bold;
`;

const CommentFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 5px;
  width: 100%;
  height: 100px;
  resize: none;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

const CheckBoxWrapper = styled(FlexRowDiv)`
  padding: 10px;
  gap: 10px;
`;

const PublishBox = styled(FlexRowDiv)`
  padding: 10px;
  border-top: 1px solid #ddd;
  justify-content: space-between;
  align-items: center;
`;
const Checkbox = styled.input`
  margin-right: 5px;
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

interface CommentProps {
  accessToken: AccessToken;
  currentPost: any;
  comment: string;
  setComment: any;
  comments: any;
  setComments: any;
}

const CommentForm = ({
  accessToken,
  currentPost,
  comment,
  setComment,
  comments,
  setComments,
}: CommentProps) => {
  const [isPrivateComment, setIsPrivateComment] = useState<boolean>(false);

  const initializeCommentForm = () => {
    setComment("");
    setIsPrivateComment(false);
  };

  const handleWriteComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const handleSubmitComment = async (
    e: React.MouseEvent<HTMLButtonElement>,
    currentPost: any,
    comment: string
  ) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `/api/protected/posts/${currentPost.postId}/comments`,
        {
          comment,
          isPrivateComment,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(`${comment} 댓글 작성이 완료되었습니다.`);
      initializeCommentForm();
      setComments([...comments, result.data.comment]);
      return console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrivateCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsPrivateComment(e.target.checked);
  };

  return (
    <CommentFormContainer>
      <TextArea
        value={comment}
        onChange={(e) => handleWriteComment(e)}
        placeholder="댓글을 작성하세요"
      />
      <PublishBox>
        <CheckBoxWrapper>
          <Label>비밀글</Label>
          <Checkbox
            type="checkBox"
            checked={isPrivateComment}
            onChange={(e) => handlePrivateCommentChange(e)}
          />
        </CheckBoxWrapper>
        <Button onClick={(e) => handleSubmitComment(e, currentPost, comment)}>댓글 작성하기</Button>
      </PublishBox>
    </CommentFormContainer>
  );
};

export default CommentForm;
