import React from "react";
import styled from "styled-components";

const PostListContainer = styled.div`
  margin-bottom: 20px;
  display: grid;
  border-bottom: 1px solid #ccc;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
`;

const Post = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const PostTitle = styled.h2`
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: bold;
`;

const PostMeta = styled.p`
  margin-bottom: 5px;
  font-size: 12px;
  color: #888;
  margin-top: 5px;
`;

const PostContent = styled.p`
  margin-bottom: 5px;
  font-size: 18px;
  color: #555;
`;

interface PostListProps {
  posts: [];
  viewPost: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const PostList = ({ posts, viewPost }: PostListProps) => {
  return (
    <PostListContainer>
      {posts.map((post: any) => (
        <Post key={post.postId} onClick={() => viewPost(post)}>
          <PostTitle>제목: {post.title}</PostTitle>
          <PostMeta>
            작성자: {post.nickname}, 작성일: {post.createdAt}
          </PostMeta>
          <PostContent>{post.content}</PostContent>
        </Post>
      ))}
    </PostListContainer>
  );
};

export default PostList;
