import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { AccessToken, Comment, Post } from "../../../@types/index.d";
import PublishForm from "../../molecules/post/PublishForm";

const CommentFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  background: #fff;
  cursor: auto;
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

interface CommentFormProps {
  accessToken: AccessToken;
  currentPost: Post | null;
  comment: string;
  comments: Comment[];
  commentCount: number;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setCommentCount: React.Dispatch<React.SetStateAction<number>>;
}

const CommentForm = ({
  accessToken,
  currentPost,
  comment,
  setComment,
  comments,
  setComments,
  commentCount,
  setCommentCount,
}: CommentFormProps) => {
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
      setCommentCount(commentCount + 1);
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
      <PublishForm
        isChecked={isPrivateComment}
        onCheckboxChange={(e: { target: { checked: any } }) =>
          handlePrivateCommentChange(e.target.checked)
        }
        current="댓글 작성하기"
        onSubmit={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
          handleSubmitComment(e, currentPost, comment)
        }
      />
    </CommentFormContainer>
  );
};

export default CommentForm;
