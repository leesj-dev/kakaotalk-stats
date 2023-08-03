import React from "react";
import styled from "styled-components";
import { displayCreatedAt } from "../../../module/common/postTime";
import { UserData } from "../login/WithdrawButton";
const PostContainer = styled.div``;
const CurrentPostTitle = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;

const CurrentPostAuthor = styled.div`
  font-size: 1.7rem;
`;

const CurrentPostCreatedAt = styled.div`
  font-size: 1.7rem;
`;

const CurrentPostContent = styled.div`
  font-size: 1.7rem;
`;

const PostButtonBox = styled.div`
  display: flex;
  gap: 1rem;
`;
const DeleteButton = styled.button`
  font-size: 1.7rem;
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

const EditButton = styled.button`
  font-size: 1.7rem;
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
  userData: UserData;
  currentPost: {
    title: string;
    nickname: string;
    createdAt: string;
    content: string;
    userId: string;
  };
  clickEditPost: (e: React.MouseEvent<HTMLButtonElement>, currentPost: any) => void;
  deletePost: (e: React.MouseEvent<HTMLButtonElement>, currentPost: any) => void;
}

const Post = ({ currentPost, userData, clickEditPost, deletePost }: PostProps) => {
  return (
    <PostContainer>
      <CurrentPostTitle>제목: {currentPost.title}</CurrentPostTitle>
      <CurrentPostAuthor>작성자: {currentPost.nickname}</CurrentPostAuthor>
      <CurrentPostCreatedAt>작성일: {displayCreatedAt(currentPost.createdAt)}</CurrentPostCreatedAt>
      <CurrentPostContent>내용: {currentPost.content}</CurrentPostContent>
      {/* 자신의 글 수정 삭제 버튼 */}
      {userData?.userId === currentPost?.userId && (
        <PostButtonBox>
          <EditButton onClick={(e) => clickEditPost(e, currentPost)}>수정</EditButton>
          <DeleteButton onClick={(e) => deletePost(e, currentPost)}>삭제</DeleteButton>
        </PostButtonBox>
      )}
    </PostContainer>
  );
};

export default Post;
