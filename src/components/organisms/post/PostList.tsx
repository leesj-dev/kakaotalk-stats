import React from "react";
import styled from "styled-components";
import { displayCreatedAt } from "../../../module/common/postTime";
import { FaRegComment } from "react-icons/fa";
import { FlexRowDiv } from "../../atoms/FlexDiv";
const PostListContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const Post = styled.div`
  margin-bottom: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
const CommentIcon = styled.div`
  display: flex;
`;
const CommentDate = styled.div`
  &::before {
    content: "";
    display: inline-block;
    width: 1px;
    height: 12px; /* 막대의 높이를 설정 */
    background-color: #ccc; /* 막대의 색상을 설정 */
    margin-right: 5px; /* 막대와 콘텐츠 사이의 간격을 설정 */
    vertical-align: middle;
  }
`;
const CommentNick = styled.div`
  &::before {
    content: "";
    display: inline-block;
    width: 1px;
    height: 12px; /* 막대의 높이를 설정 */
    background-color: #ccc; /* 막대의 색상을 설정 */
    margin-right: 5px; /* 막대와 콘텐츠 사이의 간격을 설정 */
    vertical-align: middle;
  }
`;

const PostTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const PostContent = styled.p`
  margin-bottom: 20px;
  font-size: 15px;
  color: #555;
`;

const PostMeta = styled(FlexRowDiv)`
  gap: 5px;
  margin-bottom: 5px;
  font-size: 12px;
  color: #888;
  margin-top: 5px;
`;

interface PostListProps {
  posts: [];
  viewPost: (e: React.MouseEvent<HTMLButtonElement>) => void;
  comments: Comment[];
}

const PostList = ({ posts, viewPost, comments }: PostListProps) => {
  return (
    <PostListContainer>
      {posts.map((post: any) => (
        <Post key={post.postId} onClick={() => viewPost(post)}>
          <PostTitle>{post.title}</PostTitle>
          <PostContent>{post.content}</PostContent>
          <PostMeta>
            <CommentIcon>
              <FaRegComment /> {comments.length}
            </CommentIcon>
            <CommentDate>{displayCreatedAt(post.createdAt)}</CommentDate>
            <CommentNick>{post.nickname}</CommentNick>
          </PostMeta>
        </Post>
      ))}
    </PostListContainer>
  );
};

export default PostList;
