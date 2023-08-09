import React, { useEffect } from "react";
import styled from "styled-components";
import { displayCreatedAt } from "../../../module/common/postTime";
import { FaRegComment } from "react-icons/fa";
import { FlexRowDiv } from "../../atoms/FlexDiv";
import axios from "axios";
import { AccessToken, Comment, Post, UserData } from "../../../@types/index.d";
import CurrentPost from "./CurrentPost";
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

const PostItem = styled.li`
  margin-bottom: 1rem;
  padding: 3rem;
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
    height: 1.2rem; /* 막대의 높이를 설정 */
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
    height: 1.2rem; /* 막대의 높이를 설정 */
    background-color: #ccc; /* 막대의 색상을 설정 */
    margin-right: 5px; /* 막대와 콘텐츠 사이의 간격을 설정 */
    vertical-align: middle;
  }
`;

const PostTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: bold;
`;

const PostContent = styled.p`
  margin-bottom: 2rem;
  font-size: 1.5rem;
  color: #555;
`;

const PostMeta = styled(FlexRowDiv)`
  gap: 5px;
  margin-bottom: 5px;
  font-size: 12px;
  color: #888;
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
  const currentPostData: currentPostProps = {
    accessToken,
    userData,
    currentPost,
    setCurrentPost,
    comments,
    setComments,
    posts,
    setPosts,
  };

  const viewPost = async (post: Post) => {
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

  useEffect(() => {
    const loadComments = async () => {
      try {
        if (currentPost) {
          const result = await axios.get(`/api/posts/${currentPost.postId}/comments`);
          setComments([...result.data]);
          return console.log(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadComments();
    (async () => await loadComments())();
  }, [currentPost]);

  return (
    <PostListContainer>
      <PostPageTitle>게시판</PostPageTitle>
      <PostListBox>
        {posts.map((post: Post) => (
          <PostItem key={post.postId} onClick={() => viewPost(post)}>
            {currentPost && currentPost.postId === post.postId ? (
              <CurrentPost {...currentPostData} />
            ) : (
              <>
                <PostTitle>{post.title}</PostTitle>
                <PostContent>{post.content}</PostContent>
                <PostMeta>
                  <CommentIcon>
                    <FaRegComment /> {comments.length}
                  </CommentIcon>
                  <CommentDate>{displayCreatedAt(post.createdAt)}</CommentDate>
                  <CommentNick>{post.nickname}</CommentNick>
                </PostMeta>
              </>
            )}
          </PostItem>
        ))}
      </PostListBox>
    </PostListContainer>
  );
};

export default PostList;
