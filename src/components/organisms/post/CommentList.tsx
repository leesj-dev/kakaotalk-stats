import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import styled from "styled-components";
import { displayCreatedAt } from "../../../module/common/postTime";
import { FlexColumnDiv, FlexRowDiv } from "../../atoms/FlexDiv";
import { AccessToken, UserData } from "../../../@types/index.d";
import axios from "axios";

const CommentContainer = styled.div`
  border-radius: 5px;
`;
const CommentIcon = styled.div`
  margin-bottom: 10px;
  padding: 5px;
  display: flex;
  gap: 5px;
  font-size: 1.5rem;
`;

const CurrentPostProfile = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid var(--mainBlack);
  border-radius: 50%;
`;

const CommentUl = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.li`
  margin: 10px 0;
`;
const CommentBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserContainer = styled(FlexRowDiv)`
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

const CommentButtonBox = styled.div``;
const UserBox = styled(FlexColumnDiv)`
  gap: 5px;
`;
const CommentContent = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
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
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
`;

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
`;

const EditCommentInput = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  display: block;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const PublishBox = styled(FlexRowDiv)`
  padding: 10px;
  justify-content: space-between;
  align-items: center;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const CheckBox = styled.input`
  margin-right: 5px;
`;

const Label = styled.label`
  margin-right: 5px;
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

const SubmitCommentButton = styled(Button)`
  width: 10%;
`;

interface CommentListProps {
  comments: any[];
  userData: UserData;
  accessToken: AccessToken;
  currentPost: any;
  setComments: any;
  isPostEditing: boolean;
}

const CommentList = ({
  accessToken,
  comments,
  userData,
  currentPost,
  setComments,
  isPostEditing,
}: CommentListProps) => {
  const [editingCommentId, setEditingCommentId] = useState<String>("");
  const [editComment, setEditComment] = useState<string>();
  const [isCommentEditing, setIsCommentEditing] = useState<boolean>(false);
  const [editIsPrivateComment, setEditIsPrivateComment] = useState<boolean | undefined>();

  const clickEditComment = async (
    e: React.FormEvent<HTMLButtonElement>,
    currentPost: any,
    comment: any
  ) => {
    e.preventDefault();
    try {
      const result = await axios.get(
        `/api/protected/posts/${currentPost.postId}/comments/${comment._id}/authorization`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(`${comment._id} 댓글 수정 권한 확인이 완료되었습니다.`);
      setEditComment(comment.comment);
      setEditIsPrivateComment(comment.isPrivateContent);
      setIsCommentEditing(!isPostEditing);
      setEditingCommentId(comment._id);
      return console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletedComment = async (e: any, comment: any) => {
    e.preventDefault();
    try {
      const result = await axios.delete(
        `/api/protected/posts/${currentPost.postId}/comments/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const copiedComments = [...comments];
      const afterDeletedComments = copiedComments.filter((item) => item._id !== comment._id);
      setComments([...afterDeletedComments]);
      return console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPrivateCommentChange = (e: any) => {
    e.preventDefault();
    setEditIsPrivateComment(e.target.checked);
  };

  const submitEditComment = async (
    e: React.FormEvent<HTMLFormElement>,
    currentPost: any,
    comment: any
  ) => {
    e.preventDefault();
    const toEditCommentData = {
      comment: editComment,
      isPrivateComment: editIsPrivateComment,
    };

    try {
      const result = await axios.put(
        `/api/protected/posts/${currentPost.postId}/comments/${comment._id}`,
        { ...toEditCommentData },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(`댓글 수정이 완료되었습니다.`);
      const editedCommentId = result.data.comment._id;
      const editedCommentIndex = comments.findIndex((item: any) => item._id === editedCommentId);

      const copiedComments = [...comments];
      copiedComments[editedCommentIndex] = {
        ...result.data.comment,
        ...toEditCommentData,
      };
      setComments(copiedComments);
      setIsCommentEditing(false);
      return console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CommentContainer>
      <CommentIcon>
        <FaRegComment /> {comments.length}
      </CommentIcon>
      <CommentUl>
        {comments.length ? (
          comments.map((comment: any) => (
            <CommentItem key={comment._id}>
              <CommentBox>
                <UserContainer>
                  <CurrentPostProfile />
                  <UserBox>
                    <CommentAuthor>{comment.nickname}</CommentAuthor>
                    <CommentTime> {displayCreatedAt(comment.createdAt)}</CommentTime>
                  </UserBox>
                </UserContainer>
                {userData?.userId === comment?.userId && (
                  <CommentButtonBox>
                    <EditCommentButton onClick={(e) => clickEditComment(e, currentPost, comment)}>
                      수정
                    </EditCommentButton>
                    <DeleteCommentButton onClick={(e) => handleDeletedComment(e, comment)}>
                      삭제
                    </DeleteCommentButton>
                  </CommentButtonBox>
                )}
              </CommentBox>

              {editingCommentId === comment._id && isCommentEditing ? (
                <CommentFormContainer>
                  <FormGroup onSubmit={(e) => submitEditComment(e, currentPost, comment)}>
                    <EditCommentInput
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                    />
                    <PublishBox>
                      <CheckBoxWrapper>
                        <Label>비밀글</Label>
                        <CheckBox
                          type="checkbox"
                          checked={editIsPrivateComment}
                          onChange={(e) => handleEditPrivateCommentChange(e.target.checked)}
                        />
                      </CheckBoxWrapper>
                      <SubmitCommentButton type="submit">댓글 수정하기</SubmitCommentButton>
                    </PublishBox>
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
      </CommentUl>
    </CommentContainer>
  );
};

export default CommentList;
