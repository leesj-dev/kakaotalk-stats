import React, { useState } from "react";
import styled from "styled-components";
import { displayCreatedAt } from "../../../module/common/postTime";
import { FlexRowDiv } from "../../atoms/FlexDiv";
import { AccessToken, UserData } from "../../../@types/index.d";
import axios from "axios";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import PostForm from "./PostForm";
import EditPostForm from "./EditPostForm";

const PostContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserContainer = styled(FlexRowDiv)`
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

const UserBox = styled.div``;
const PostContent = styled.div``;

const CurrentPostProfile = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid var(--mainBlack);
  border-radius: 50%;
`;

const CurrentPostTitle = styled.div`
  margin-bottom: 10px;
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
  margin-bottom: 10px;
  font-size: 1.7rem;
`;

const PostButtonBox = styled.div`
  display: flex;
  gap: 1rem;
  height: 30px;
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

// interface PostProps {
//   userData: UserData;
//   accessToken: AccessToken;
//   currentPost: {
//     title: string;
//     nickname: string;
//     createdAt: string;
//     content: string;
//     userId: string;
//   };
//   setTitleEdit: any;
//   setContentEdit: any;
//   isPostEditing: boolean;
//   setIsPostEditing: any;
//   setIsPrivatePostEdit: any;
//   setPosts: any;
//   setCurrentPost: any;
//   posts: any;
// }
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

const CurrentPost = ({
  accessToken,
  userData,
  currentPost,
  setCurrentPost,
  comments,
  setComments,
  posts,
  setPosts,
}: currentPostProps) => {
  const [titleEdit, setTitleEdit] = useState("");
  const [contentEdit, setContentEdit] = useState("");
  const [isPrivatePostEdit, setIsPrivatePostEdit] = useState<boolean>(false);
  const [isPostEditing, setIsPostEditing] = useState<boolean>(false);

  const [comment, setComment] = useState("");

  const commonData = {
    accessToken,
    currentPost,
    comments,
    setComments,
  };

  const { title, nickname, createdAt, content, userId } = currentPost;
  const isAuthor = userData?.userId === userId;

  const clickEditPost = async (e: React.FormEvent<HTMLButtonElement>, post: any) => {
    e.preventDefault();
    try {
      const result = await axios.get(`/api/protected/posts/${post.postId}/edit/authorization`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(`${post.title} 게시물 수정 권한 확인이 완료되었습니다.`);
      setTitleEdit(post.title);
      setContentEdit(post.content);
      setIsPrivatePostEdit(post.isPrivateContent);
      setIsPostEditing(!isPostEditing);
      return console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (e: React.FormEvent<HTMLButtonElement>, post: any) => {
    e.preventDefault();
    try {
      const result = await axios.delete(`/api/protected/posts/${post.postId}/delete`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(`${post.title} 게시물 삭제가 완료되었습니다.`);
      const deletedPostId = result.data.post.postId;
      setPosts(posts.filter((post: any) => post.postId !== deletedPostId));
      setCurrentPost(null);

      return console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  // if (!currentPost) {
  //   return <div>No post selected.</div>;
  // }
  return (
    <>
      {/* 자신의 글 수정 삭제 버튼 */}
      <PostForm accessToken={accessToken} posts={posts} setPosts={setPosts} />
      {currentPost &&
        (isPostEditing ? (
          // 글을 수정했을 때 수정 폼
          <EditPostForm
            accessToken={accessToken}
            posts={posts}
            setPosts={setPosts}
            currentPost={currentPost}
            setCurrentPost={setCurrentPost}
            setIsPostEditing={setIsPostEditing}
            contentEdit={contentEdit}
            setContentEdit={setContentEdit}
            isPrivatePostEdit={isPrivatePostEdit}
            setIsPrivatePostEdit={setIsPrivatePostEdit}
            titleEdit={titleEdit}
            setTitleEdit={setTitleEdit}
          />
        ) : (
          <PostContainer>
            <PostContent>
              <UserContainer>
                <CurrentPostProfile />
                <UserBox>
                  <CurrentPostAuthor>{nickname}</CurrentPostAuthor>
                  <CurrentPostCreatedAt>{displayCreatedAt(createdAt)}</CurrentPostCreatedAt>
                </UserBox>
              </UserContainer>
              <CurrentPostTitle>{title}</CurrentPostTitle>
              <CurrentPostContent>{content}</CurrentPostContent>
            </PostContent>
            {isAuthor && (
              <PostButtonBox>
                <EditButton onClick={(e) => clickEditPost(e, currentPost)}>수정</EditButton>
                <DeleteButton onClick={(e) => deletePost(e, currentPost)}>삭제</DeleteButton>
              </PostButtonBox>
            )}
            {/* 댓글 리스트 */}
            <CommentList {...commonData} userData={userData} isPostEditing={isPostEditing} />
            {/* 댓글 작성 폼 */}
            <CommentForm {...commonData} comment={comment} setComment={setComment} />
          </PostContainer>
        ))}
    </>
  );
};

export default CurrentPost;
