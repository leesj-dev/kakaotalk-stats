import React from "react";
import styled from "styled-components";
import { UserData } from "../login/WithdrawButton";

const CommentContainer = styled.div`
  margin: 10px 0;
`;

const CommentCountBox = styled.div``;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.li`
  margin: 5px 0;
`;

const CommentContent = styled.div`
  padding: 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const CommentAuthor = styled.span`
  font-weight: bold;
`;

const CommentTime = styled.span`
  font-size: 12px;
  color: #777;
`;

const EditCommentButton = styled.button`
  background: none;
  text-decoration: underline;
  border: none;
  cursor: pointer;
`;

const DeleteCommentButton = styled.button`
  background: none;
  text-decoration: underline;
  border: none;
  cursor: pointer;
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

const FormGroup = styled.form`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const EditCommentInput = styled.input`
  display: block;
  padding: 8px;
  width: 100%;
  border-radius: 4px;
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

const Label = styled.label`
  margin-bottom: 5px;
  display: block;
  font-size: 14px;
  font-weight: bold;
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

const SubmitCommentButton = styled(Button)``;

interface CommentListProps {
  comments: Comment[];
  userData: UserData;
  clickEditComment: (
    e: React.FormEvent<HTMLButtonElement>,
    currentPost: any,
    comment: any
  ) => Promise<void>;
  handleDeletedComment: (e: any, comment: any) => Promise<void>;
  editingCommentId: String;
  isCommentEditing: boolean;
  editComment: string;
  setEditComment: React.Dispatch<React.SetStateAction<string>>;
  editIsPrivateComment: boolean | undefined;
  handleEditPrivateCommentChange: (isPrivate: boolean) => void;
  currentPost: any;
  submitEditComment: (
    e: React.FormEvent<HTMLFormElement>,
    currentPost: any,
    comment: any
  ) => Promise<void>;
}

const CommentListForm = ({
  comments,
  userData,
  clickEditComment,
  handleDeletedComment,
  editingCommentId,
  isCommentEditing,
  editComment,
  setEditComment,
  editIsPrivateComment,
  handleEditPrivateCommentChange,
  currentPost,
  submitEditComment,
}: CommentListProps) => {
  return (
    <CommentContainer>
      <CommentCountBox>댓글:{comments.length}개</CommentCountBox>
      <CommentList>
        {comments.length ? (
          comments.map((comment: any) => (
            <CommentItem key={comment._id}>
              <CommentAuthor>작성자: {comment.nickname}</CommentAuthor>
              <CommentTime>작성시간: {comment.createdAt}</CommentTime>
              {userData?.userId === comment?.userId && (
                <>
                  <EditCommentButton onClick={(e) => clickEditComment(e, currentPost, comment)}>
                    수정
                  </EditCommentButton>
                  <DeleteCommentButton onClick={(e) => handleDeletedComment(e, comment)}>
                    삭제
                  </DeleteCommentButton>
                </>
              )}
              {editingCommentId === comment._id && isCommentEditing ? (
                <CommentFormContainer>
                  <FormGroup onSubmit={(e) => submitEditComment(e, currentPost, comment)}>
                    <EditCommentInput
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                    />
                    <CheckBoxWrapper>
                      <Label>비밀글</Label>
                      <CheckBox
                        type="checkbox"
                        checked={editIsPrivateComment}
                        onChange={(e) => handleEditPrivateCommentChange(e.target.checked)}
                      />
                    </CheckBoxWrapper>
                    <SubmitCommentButton type="submit">댓글 수정하기</SubmitCommentButton>
                  </FormGroup>
                </CommentFormContainer>
              ) : (
                <CommentContent>{comment.comment}</CommentContent>
              )}
            </CommentItem>
          ))
        ) : (
          <CommentItem>댓글이 없습니다.</CommentItem>
        )}
      </CommentList>
    </CommentContainer>
  );
};

export default CommentListForm;
