import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostList from "../organisms/post/PostList";
import { AccessToken, Post } from "../../@types/index.d";
import { useSelector } from "react-redux";
import PostForm from "../organisms/post/PostForm";

const PostPageContainer = styled.div`
  margin: 8rem auto 0 auto;
  padding: 20px;
  max-width: 1240px;
`;

const NonePostContainer = styled.div`
  margin-bottom: 30px;
  font-size: 2rem;
`;

const PostPage = () => {
  const accessToken = useSelector(
    (state: { userLoginAccessTokenSlice: AccessToken }) => state.userLoginAccessTokenSlice
  );

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadInitialPosts = async () => {
      try {
        const result = await axios.get("/api/posts");
        setPosts(result.data.posts);
      } catch (error) {
        console.error(error);
      }
    };

    (async () => await loadInitialPosts())();
  }, []);

  const postsProps = {
    accessToken,
    posts,
    setPosts,
  };

  return (
    <PostPageContainer>
      <PostForm {...postsProps} />
      {posts ? <PostList {...postsProps} /> : <NonePostContainer>게시물이 없습니다.</NonePostContainer>}
    </PostPageContainer>
  );
};

export default PostPage;
