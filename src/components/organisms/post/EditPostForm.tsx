import axios from "axios";
import React from "react";
import styled from "styled-components";
import { AccessToken } from "../../../@types/index.d";
import PublishForm from "../../molecules/post/PublishForm";

// 입력 폼 스타일
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
`;

const FormGroup = styled.form`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  display: block;
  font-size: 14px;
  font-weight: bold;
`;

const Input = styled.input`
  margin-bottom: 5px;
  padding: 8px 12px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

const Textarea = styled.textarea`
  margin-bottom: 5px;
  padding: 8px 12px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  resize: none;
`;

interface EditPostFormProps {
  currentPost: any;
  accessToken: AccessToken;
  posts: any;
  setPosts: any;
  setCurrentPost: any;
  setIsPostEditing: any;
  contentEdit: string;
  isPrivatePostEdit: any;
  titleEdit: string;
  setTitleEdit: any;
  setContentEdit: any;
  setIsPrivatePostEdit: any;
}

const EditPostForm = ({
  currentPost,
  accessToken,
  posts,
  setPosts,
  setCurrentPost,
  setIsPostEditing,
  contentEdit,
  isPrivatePostEdit,
  titleEdit,
  setTitleEdit,
  setContentEdit,
  setIsPrivatePostEdit,
}: EditPostFormProps) => {
  const requestEditPost = async (post: any, toEditPostData: any) => {
    try {
      const result = await axios.put(
        `/api/protected/posts/${post.postId}/edit`,
        { ...toEditPostData },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const editPost = async (e: React.FormEvent<HTMLFormElement>, post: any) => {
    e.preventDefault();

    const toEditPostData = {
      title: titleEdit,
      content: contentEdit,
      isPrivateContent: isPrivatePostEdit,
    };

    try {
      const result = await requestEditPost(post, toEditPostData);
      if (result) {
        const editedPostId = result.data.post.postId;
        const editedPostIndex = posts.findIndex((item: any) => item.postId === editedPostId);
        const copiedPosts = [...posts];
        copiedPosts[editedPostIndex] = {
          ...result.data.post,
          ...toEditPostData,
        };

        setPosts(copiedPosts);
        setCurrentPost(copiedPosts[editedPostIndex]);
        setIsPostEditing(false);
        return console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormContainer>
      <FormGroup
        onSubmit={(e) => {
          editPost(e, currentPost);
        }}
      >
        <Label>제목</Label>
        <Input type="text" value={titleEdit} onChange={(e) => setTitleEdit(e.target.value)} />
        <Label>내용</Label>
        <Textarea value={contentEdit} onChange={(e) => setContentEdit(e.target.value)} />
        <PublishForm
          isChecked={isPrivatePostEdit}
          onCheckboxChange={(e: { target: { checked: any } }) => setIsPrivatePostEdit(e.target.checked)}
          current="수정하기"
          onSubmit={null}
        />
      </FormGroup>
    </FormContainer>
  );
};

export default EditPostForm;
