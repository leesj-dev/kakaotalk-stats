import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import { AccessToken, Comment, Post, UserData } from "../../../@types/index.d";
import CurrentPost from "./CurrentPost";
import PostItem from "../../molecules/post/PostItem";

const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostPageTitle = styled.h1`
  margin-bottom: 2rem;
  font-size: 2.4rem;
  font-weight: bold;
`;

const PostListBox = styled.ul``;

const PostItemBox = styled.li<{ currentPost: boolean }>`
  margin-bottom: 1rem;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 5px;

  &:hover {
    background: ${(props) => (props.currentPost ? "#fff" : "#00000010")};
    cursor: ${(props) => (props.currentPost ? "auto" : "pointer")};
  }
`;

interface currentPostProps {
  accessToken: AccessToken;
  userData: UserData;
  currentPost: Post | null;
  comments: Comment[];
  posts: Post[];
  setCurrentPost: (post: Post | null) => void;
  setComments: (comment: Comment[]) => void;
  setPosts: (post: Post[]) => void;
}

const PostList = ({
  accessToken,
  userData,
  currentPost,
  setCurrentPost,
  comments,
  setComments,
  posts,
  setPosts,
}: currentPostProps) => {
  const handleClickPost = async (post: Post) => {
    // 동일한 포스트를 클릭한 경우에는 viewPost를 다시 동작하지 않도록 함
    if (currentPost && currentPost.postId !== post.postId) {
      await viewPost(post);
    }
  };

  // 게시물 조회 요청
  const requestPostData = async (post: Post) => {
    try {
      const result = await axios.get(`/api/posts/${post.postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(`${post.title} 게시물 조회가 완료되었습니다.`);
      return result.data.post;
    } catch (error) {
      console.error(error);
    }
  };

  const viewPost = async (post: Post) => {
    const postData = await requestPostData(post);
    setCurrentPost(postData);
  };

  const PostItemProps = {
    userData,
    comments,
    accessToken,
    posts,
    currentPost,
    setComments,
    setPosts,
    setCurrentPost,
  };

  return (
    <PostListContainer>
      <PostPageTitle>게시판</PostPageTitle>
      <PostListBox>
        {posts.map((post: Post) => {
          const isSameAuthor = userData?.userId === currentPost?.userId;

          return (
            <PostItemBox
              key={post.postId}
              onClick={() => handleClickPost(post)}
              currentPost={currentPost?.postId === post.postId}
            >
              {currentPost && currentPost.postId === post.postId ? (
                <PostItem {...PostItemProps} post={post} isSameAuthor={isSameAuthor} />
              ) : (
                <PostItem {...PostItemProps} post={post} />
              )}
            </PostItemBox>
          );
        })}
      </PostListBox>
    </PostListContainer>
  );
};

export default PostList;
