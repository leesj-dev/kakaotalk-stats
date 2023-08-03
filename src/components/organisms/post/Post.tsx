import React from "react";
import styled from "styled-components";
import { displayCreatedAt } from "../../../module/common/postTime";
import { FlexRowDiv } from "../../atoms/FlexDiv";
import { UserData } from "../login/WithdrawButton";

const PostContainer = styled.div`
  padding: 20px;
  border-bottom: 1px solid var(--mainGray);
`;
const UserContainer = styled(FlexRowDiv)`
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;
const UserBox = styled.div``;

const CurrentPostProfile = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid var(--mainBlack);
  border-radius: 50%;
`;
const CurrentPostTitle = styled.div`
  margin-bottom: 30px;
  font-size: 3rem;
  font-weight: 700;
`;

const CurrentPostAuthor = styled.div`
  margin-bottom: 5px;
  font-weight: 700;
  font-size: 2rem;
`;

const CurrentPostCreatedAt = styled.div`
  font-size: 1.3rem;
  color: var(--mainGray);
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
  const { title, nickname, createdAt, content, userId } = currentPost;
  const isAuthor = userData?.userId === userId;

  return (
    <PostContainer>
      <UserContainer>
        <CurrentPostProfile />
        <UserBox>
          <CurrentPostAuthor>{nickname}</CurrentPostAuthor>
          <CurrentPostCreatedAt>{displayCreatedAt(createdAt)}</CurrentPostCreatedAt>
        </UserBox>
      </UserContainer>
      <CurrentPostTitle>{title}</CurrentPostTitle>

      <CurrentPostContent>{content}</CurrentPostContent>
      {/* 자신의 글 수정 삭제 버튼 */}
      {isAuthor && (
        <PostButtonBox>
          <EditButton onClick={(e) => clickEditPost(e, currentPost)}>수정</EditButton>
          <DeleteButton onClick={(e) => deletePost(e, currentPost)}>삭제</DeleteButton>
        </PostButtonBox>
      )}
    </PostContainer>
  );
};

export default Post;
