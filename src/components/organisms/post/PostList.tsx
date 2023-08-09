import React, { useEffect } from "react";
import styled from "styled-components";
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

const PostItemBox = styled.li`
  margin-bottom: 1rem;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
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
  const currentPostProps: currentPostProps = {
    accessToken,
    userData,
    currentPost,
    setCurrentPost,
    comments,
    setComments,
    posts,
    setPosts,
  };

  const viewPost = async (e: React.MouseEvent, post: Post) => {
    e.stopPropagation();
    console.log("조회함");

    try {
      const result = await axios.get(`/api/posts/${post.postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(`${post.title} 게시물 조회가 완료되었습니다.`);
      setCurrentPost(result.data.post);
      return console.log(result);
    } catch (error) {
      console.error(error);
    }
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
            <PostItemBox key={post.postId} onClick={(e) => viewPost(e, post)}>
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
