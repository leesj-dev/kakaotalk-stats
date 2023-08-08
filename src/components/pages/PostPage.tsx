import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CurrentPost from "../organisms/post/CurrentPost";
import PostList from "../organisms/post/PostList";
import { AccessToken, UserData } from "../../@types/index.d";
import { useSelector } from "react-redux";
import PostForm from "../organisms/post/PostForm";

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

interface currentPostProps {
  accessToken: any;
  userData: any;
  currentPost: any;
  setCurrentPost: any;
  comments: any;
  setComments: any;
  posts: any;
  setPosts: any;
}

// interface CommentListFormProps extends CommentProps {
//   comment: any;
//   setComment: any;
// }
// interface CommentListProps extends CommentProps {
//   userData: any;
//   isPostEditing: any;
// }

const PostPage = () => {
  const userData = useSelector((state: { userLoginDataSlice: UserData }) => state.userLoginDataSlice);
  const accessToken = useSelector(
    (state: { userLoginAccessTokenSlice: AccessToken }) => state.userLoginAccessTokenSlice
  );

  const [posts, setPosts] = useState<any>([]);
  const [currentPost, setCurrentPost] = useState<any>(null);
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
    loadComments();
    (async () => await loadComments())();
  }, [currentPost]);

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

  return (
    <PostPageContainer>
      {/* 게시글작성폼 */}
      <PostForm accessToken={accessToken} posts={posts} setPosts={setPosts} />

      {currentPost ? <CurrentPost {...currentPostData} /> : <div>No post selected.</div>}
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
