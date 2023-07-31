import { current } from "@reduxjs/toolkit";
import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PostPageContainer = styled.div`
  margin: 200px auto;
  padding: 20px;
  max-width: 1240px;
`;

const PostPageTitle = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const PostList = styled.div`
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

// 버튼 스타일
const Button = styled.button`
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

// 입력 폼 스타일
const FormContainer = styled.div`
  max-width: 400px;
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
  resize: vertical;
`;

const Checkbox = styled.input`
  margin-bottom: 5px;
`;

const NonePostContainer = styled.div`
  margin-bottom: 30px;
  font-size: 2rem;
`;

const CurrentPostContainer = styled.div`
  margin-bottom: 3rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CurrentPostTitle = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;

const CurrentPostAuthor = styled.div`
  font-size: 1.7rem;
`;

const CurrentPostCreatedAt = styled.div`
  font-size: 1.7rem;
`;

const CurrentPostContent = styled.div`
  font-size: 1.7rem;
`;

const PostButtonBox = styled.div`
  display: flex;
  gap: 1rem;
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

const CommentFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  width: 100%;
`;

const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;
`;

const CheckBox = styled.input`
  margin-right: 5px;
`;

const SubmitCommentButton = styled(Button)``;

const CommentContainer = styled.div`
  margin: 10px 0;
`;

const CommentCountBox = styled.div``;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.li`
  margin: 5px 0;
`;

const CommentContent = styled.div`
  padding: 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const CommentAuthor = styled.span`
  font-weight: bold;
`;

const CommentTime = styled.span`
  font-size: 12px;
  color: #777;
`;

const EditCommentButton = styled.button`
  background: none;
  text-decoration: underline;
  border: none;
  cursor: pointer;
`;

const DeleteCommentButton = styled.button`
  background: none;
  text-decoration: underline;
  border: none;
  cursor: pointer;
`;

interface PostPageProps {
  accessToken: string;
}
const PostPage = ({ accessToken }: PostPageProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPrivateContent, setIsPrivateContent] = useState<boolean>(false);

  const [posts, setPosts] = useState<any>([]);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [isSameAuthor, setIsSameAuthor] = useState<any>(false);

  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editIsPrivate, setEditIsPrivateContent] = useState<boolean>(false);
  const [isPostEditing, setIsPostEditing] = useState<boolean>(false);

  const [comment, setComment] = useState("");
  const [isPrivateComment, setIsPrivateComment] = useState(false);

  const [comments, setComments] = useState<any>([]);

  const initializePostForm = () => {
    setTitle("");
    setContent("");
    setIsPrivateContent(false);
  };

  const initializeCommentForm = () => {
    setComment("");
    setIsPrivateComment(false);
  };

  const createPostTest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "/api/protected/posts/create",
        {
          title,
          content,
          isPrivateContent,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(`${title} 게시물 작성이 완료되었습니다.`);
      initializePostForm();
      setPosts([result.data.post, ...posts]);
      return console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const viewPost = async (post: any) => {
    try {
      const result = await axios.get(`/api/posts/${post.postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(result.data);

      console.log(`${post.title} 게시물 조회가 완료되었습니다.`);
      setCurrentPost(result.data.post);
      setIsSameAuthor(result.data.isSameAuthor);
      return console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const clickEditPost = async (e: React.FormEvent<HTMLButtonElement>, post: any) => {
    e.preventDefault();
    try {
      const result = await axios.get(`/api/protected/posts/${post.postId}/edit/authorization`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(`${post.title} 게시물 수정 권한 확인이 완료되었습니다.`);
      setEditTitle(post.title);
      setEditContent(post.content);
      setEditIsPrivateContent(post.isPrivateContent);
      setIsPostEditing(!isPostEditing);
      return console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const editPost = async (e: React.FormEvent<HTMLFormElement>, post: any) => {
    e.preventDefault();
    const toEditPostData = {
      title: editTitle,
      content: editContent,
      isPrivateContent: editIsPrivate,
    };

    try {
      console.log("??????????");
      const result = await axios.put(
        `/api/protected/posts/${post.postId}/edit`,
        { ...toEditPostData },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(`${post.title} 게시물 수정이 완료되었습니다.`);
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
      console.log(result.data);
      const deletedPostId = result.data.post.postId;
      setPosts(posts.filter((post: any) => post.postId !== deletedPostId));
      setCurrentPost(null);

      return console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleWriteComment = (e: any) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const handlePrivateCommentChange = (e: any) => {
    e.preventDefault();
    setIsPrivateComment(e.target.checked);
  };

  const handleSubmitComment = async (e: any, post: any) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `/api/protected/posts/${post.postId}/comments`,
        {
          comment,
          isPrivateComment,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(`${comment} 댓글 작성이 완료되었습니다.`);
      initializeCommentForm();
      console.log(result);
      setComments([...comments, result.data.comment]);
      return console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletedComment = async (e: any, comment: any) => {
    e.preventDefault();
    try {
      const result = await axios.delete(
        `/api/protected/posts/${currentPost.postId}/comments/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(`${comment} 댓글 삭제가 완료되었습니다.`);
      console.log(result);
      const copiedComments = [...comments];
      const afterDeletedComments = copiedComments.filter((item) => item._id !== comment._id);
      setComments([...afterDeletedComments]);
      return console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

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
        const result = await axios.get(`/api/posts/${currentPost.postId}/comments`);
        console.log(result);
        setComments([...result.data]);
        return console.log(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    (async () => await loadComments())();
  }, [currentPost]);

  return (
    <PostPageContainer>
      {currentPost &&
        (isPostEditing ? (
          <FormContainer>
            <FormGroup
              onSubmit={(e) => {
                editPost(e, currentPost);
              }}
            >
              <Label>제목</Label>
              <Input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
              <Label>내용</Label>
              <Textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
              <Label>비밀글</Label>
              <Checkbox
                type="checkBox"
                checked={editIsPrivate}
                onChange={(e) => setEditIsPrivateContent(e.target.checked)}
              ></Checkbox>
              <Button type="submit">수정하기</Button>
            </FormGroup>
          </FormContainer>
        ) : (
          <CurrentPostContainer>
            <CurrentPostTitle>제목: {currentPost.title}</CurrentPostTitle>
            <CurrentPostAuthor>작성자: {currentPost.nickname}</CurrentPostAuthor>
            <CurrentPostCreatedAt>작성일: {currentPost.createdAt}</CurrentPostCreatedAt>
            <CurrentPostContent>내용: {currentPost.content}</CurrentPostContent>
            {isSameAuthor && (
              <PostButtonBox>
                <EditButton onClick={(e) => clickEditPost(e, currentPost)}>수정</EditButton>
                <DeleteButton onClick={(e) => deletePost(e, currentPost)}>삭제</DeleteButton>
              </PostButtonBox>
            )}
            <CommentContainer>
              <CommentCountBox>댓글:{comments.length}개</CommentCountBox>
              <CommentList>
                {comments.length ? (
                  comments.map((comment: any) => (
                    <CommentItem key={comment.commentId}>
                      <CommentAuthor>작성자: {comment.nickname}</CommentAuthor>
                      <CommentTime>작성시간: {comment.createdAt}</CommentTime>
                      <EditCommentButton>수정</EditCommentButton>
                      <DeleteCommentButton onClick={(e) => handleDeletedComment(e, comment)}>
                        삭제
                      </DeleteCommentButton>
                      <CommentContent>{comment.comment}</CommentContent>
                    </CommentItem>
                  ))
                ) : (
                  <CommentItem>댓글이 없습니다.</CommentItem>
                )}
              </CommentList>
            </CommentContainer>
            <CommentFormContainer>
              <TextArea
                value={comment}
                onChange={(e) => handleWriteComment(e)}
                placeholder="댓글을 입력하세요"
              />
              <CheckBoxWrapper>
                <Label>비밀글</Label>
                <CheckBox
                  type="checkbox"
                  checked={isPrivateComment}
                  onChange={(e) => handlePrivateCommentChange(e)}
                />
              </CheckBoxWrapper>
              <SubmitCommentButton onClick={(e) => handleSubmitComment(e, currentPost)}>
                댓글 작성하기
              </SubmitCommentButton>
            </CommentFormContainer>
          </CurrentPostContainer>
        ))}
      <PostPageTitle>게시판</PostPageTitle>
      {posts ? (
        <PostList>
          {posts.map((post: any) => (
            <Post key={post.postId} onClick={() => viewPost(post)}>
              <PostTitle>제목: {post.title}</PostTitle>
              <PostMeta>
                작성자: {post.nickname}, 작성일: {post.createdAt}
              </PostMeta>
              <PostContent>{post.content}</PostContent>
            </Post>
          ))}
        </PostList>
      ) : (
        <NonePostContainer>게시물이 없습니다.</NonePostContainer>
      )}
      <FormContainer>
        <FormGroup onSubmit={(e) => createPostTest(e)}>
          <Label>제목</Label>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Label>내용</Label>
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
          <Label>비밀글</Label>
          <Checkbox
            type="checkBox"
            checked={isPrivateContent}
            onChange={(e) => setIsPrivateContent(e.target.checked)}
          ></Checkbox>
          <Button type="submit">글쓰기</Button>
        </FormGroup>
      </FormContainer>
    </PostPageContainer>
  );
};

export default PostPage;
