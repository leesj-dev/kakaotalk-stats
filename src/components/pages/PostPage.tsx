import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CommentForm from "../organisms/post/CommentForm";
import CommentListForm from "../organisms/post/CommentList";
import Post from "../organisms/post/Post";
import PostForm from "../organisms/post/PostForm";
import PostList from "../organisms/post/PostList";
import { AccessToken, UserData } from "../../@types/index.d";
import { useSelector } from "react-redux";
import EditPostForm from "../organisms/post/EditPostForm";

const PostPageContainer = styled.div`
  margin: 90px auto;
  padding: 20px;
  max-width: 1240px;
`;

const PostPageTitle = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const NonePostContainer = styled.div`
  margin-bottom: 30px;
  font-size: 2rem;
`;

const CurrentPostContainer = styled.div`
  margin-bottom: 3rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const PostPage = () => {
  const userData = useSelector((state: { userLoginDataSlice: UserData }) => state.userLoginDataSlice);
  const accessToken = useSelector(
    (state: { userLoginAccessTokenSlice: AccessToken }) => state.userLoginAccessTokenSlice
  );

  const [posts, setPosts] = useState<any>([]);
  const [currentPost, setCurrentPost] = useState<any>(null);

  const [titleEdit, setTitleEdit] = useState("");
  const [contentEdit, setContentEdit] = useState("");
  const [isPrivatePostEdit, setIsPrivatePostEdit] = useState<boolean>(false);
  const [isPostEditing, setIsPostEditing] = useState<boolean>(false);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const result = await axios.get("/api/posts");
        console.log(`게시물 조회가 완료되었습니다.`);
        setPosts(result.data.posts);
        return console.log(result.data.posts);
      } catch (error) {
        console.error(error);
      }
    };

    (async () => await loadPosts())();
  }, []);

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

    (async () => await loadComments())();
  }, [currentPost]);

  return (
    <PostPageContainer>
      {/* 게시글작성폼 */}
      <PostForm accessToken={accessToken} posts={posts} setPosts={setPosts} />
      {currentPost &&
        (isPostEditing ? (
          // 글을 수정했을 때 수정 폼
          <EditPostForm
            accessToken={accessToken}
            currentPost={currentPost}
            setCurrentPost={setCurrentPost}
            posts={posts}
            setPosts={setPosts}
            titleEdit={titleEdit}
            contentEdit={contentEdit}
            setIsPostEditing={setIsPostEditing}
            isPrivatePostEdit={isPrivatePostEdit}
            setTitleEdit={setTitleEdit}
            setContentEdit={setContentEdit}
            setIsPrivatePostEdit={setIsPrivatePostEdit}
          />
        ) : (
          <CurrentPostContainer>
            <Post
              accessToken={accessToken}
              userData={userData}
              currentPost={currentPost}
              posts={posts}
              setPosts={setPosts}
              setTitleEdit={setTitleEdit}
              setContentEdit={setContentEdit}
              isPostEditing={isPostEditing}
              setIsPostEditing={setIsPostEditing}
              setIsPrivatePostEdit={setIsPrivatePostEdit}
              setCurrentPost={setCurrentPost}
            />
            {/* 댓글 리스트 */}
            <CommentListForm
              accessToken={accessToken}
              userData={userData}
              currentPost={currentPost}
              comments={comments}
              setComments={setComments}
              isPostEditing={isPostEditing}
            />
            {/* 댓글 작성 폼 */}
            <CommentForm
              accessToken={accessToken}
              currentPost={currentPost}
              comment={comment}
              setComment={setComment}
              comments={comments}
              setComments={setComments}
            />
          </CurrentPostContainer>
        ))}
      {/* 게시글 */}
      <PostPageTitle>게시판</PostPageTitle>
      {posts ? (
        <PostList
          accessToken={accessToken}
          posts={posts}
          setCurrentPost={setCurrentPost}
          comments={comments}
        />
      ) : (
        <NonePostContainer>게시물이 없습니다.</NonePostContainer>
      )}
    </PostPageContainer>
  );
};

export default PostPage;
