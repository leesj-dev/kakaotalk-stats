import React, { useState } from "react";
import styled from "styled-components";
import { displayCreatedAt } from "../../../module/common/postTime";
import { FlexRowDiv } from "../../atoms/FlexDiv";
import axios from "axios";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import EditPostForm from "./EditPostForm";
import { AccessToken, Comment, Post, UserData } from "../../../@types/index.d";
import { FaRegComment } from "react-icons/fa";

const PostContainer = styled.div`
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 5px;
`;

const CurrentPostBox = styled(FlexRowDiv)`
  justify-content: space-between;
`;

const PostInfo = styled.div``;

const UserContainer = styled(FlexRowDiv)`
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

const CurrentPostProfile = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid var(--mainBlack);
  border-radius: 50%;
`;

const UserBox = styled.div``;

const CurrentPostAuthor = styled.div`
  margin-bottom: 5px;
  font-weight: 700;
  font-size: 2rem;
`;

const CurrentPostCreatedAt = styled.div`
  font-size: 1.3rem;
  color: var(--mainGray);
`;

const PostContent = styled.div<{ isPostEditing?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: ${({ isPostEditing }) => (isPostEditing ? "column" : "row")};
  justify-content: space-between;
`;

const CurrentPostTitle = styled.div`
  margin-bottom: 10px;
  font-size: 1.7rem;
  font-weight: 700;
`;

const CurrentPostContent = styled.div`
  margin-bottom: 10px;
  font-size: 1.7rem;
`;

const CommentIcon = styled.div`
  padding: 5px;
  display: flex;
  gap: 5px;
  font-size: 1.5rem;
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

interface currentPostProps {
  accessToken: AccessToken;
  userData: UserData;
  currentPost: Post | null;
  comments: Comment[];
  posts: Post[];
  isSameAuthor?: boolean;
  setCurrentPost: (post: Post | null) => void;
  setComments: (comment: Comment[]) => void;
  setPosts: (post: Post[]) => void;
}

const CurrentPost = ({
  accessToken,
  userData,
  currentPost,
  comments,
  posts,
  isSameAuthor,
  setCurrentPost,
  setComments,
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

  let currentPostData = {
    title: "",
    nickname: "",
    createdAt: "",
    content: "",
    userId: "",
  };

  if (currentPost) {
    currentPostData = { ...currentPostData, ...currentPost };
  }

  const { title, nickname, createdAt, content } = currentPostData;

  const clickEditPost = async (e: React.FormEvent<HTMLButtonElement>, post: Post) => {
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
      setIsPrivatePostEdit(post.isPrivate);
      setIsPostEditing(!isPostEditing);
      return console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (e: React.FormEvent<HTMLButtonElement>, post: Post) => {
    e.preventDefault();
    try {
      const result = await axios.delete(`/api/protected/posts/${post.postId}/delete`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(`${post.title} 게시물 삭제가 완료되었습니다.`);
      const deletedPostId = result.data.post.postId;
      setPosts(posts.filter((post: Post) => post.postId !== deletedPostId));
      setCurrentPost(null);

      return console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* 자신의 글 수정 삭제 버튼 */}

      {currentPost &&
        (isPostEditing ? (
          // 글을 수정했을 때 수정 폼
          <PostContainer>
            <CurrentPostBox>
              <PostContent isPostEditing={isPostEditing}>
                <UserContainer>
                  <CurrentPostProfile />
                  <UserBox>
                    <CurrentPostAuthor>{nickname}</CurrentPostAuthor>
                    <CurrentPostCreatedAt>{displayCreatedAt(createdAt)}</CurrentPostCreatedAt>
                  </UserBox>
                </UserContainer>
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
              </PostContent>
            </CurrentPostBox>

            {/* 댓글 리스트 */}
            <CommentList {...commonData} userData={userData} isPostEditing={isPostEditing} />
            {/* 댓글 작성 폼 */}
            <CommentForm {...commonData} comment={comment} setComment={setComment} />
          </PostContainer>
        ) : (
          <PostContainer>
            <CurrentPostBox>
              <PostContent>
                <PostInfo>
                  <UserContainer>
                    <CurrentPostProfile />
                    <UserBox>
                      <CurrentPostAuthor>{nickname}</CurrentPostAuthor>
                      <CurrentPostCreatedAt>{displayCreatedAt(createdAt)}</CurrentPostCreatedAt>
                    </UserBox>
                  </UserContainer>
                  <CurrentPostTitle>{title}</CurrentPostTitle>
                  <CurrentPostContent>{content}</CurrentPostContent>
                  <CommentIcon>
                    <FaRegComment /> {comments.length}
                  </CommentIcon>
                </PostInfo>
                {isSameAuthor && (
                  <PostButtonBox>
                    <EditButton onClick={(e) => clickEditPost(e, currentPost)}>수정</EditButton>
                    <DeleteButton onClick={(e) => deletePost(e, currentPost)}>삭제</DeleteButton>
                  </PostButtonBox>
                )}
              </PostContent>
            </CurrentPostBox>

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
