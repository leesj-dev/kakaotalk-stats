import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CommentForm from "../organisms/post/CommentForm";
import CommentListForm from "../organisms/post/CommentList";
import Post from "../organisms/post/Post";
import PostForm from "../organisms/post/PostForm";
import PostList from "../organisms/post/PostList";
import PostListForm from "../organisms/post/PostList";

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

interface PostPageProps {
  accessToken: string;
  userData: any;
}
const PostPage = ({ accessToken, userData }: PostPageProps) => {
  const [title, setTitle] = useState("");
  const [content, edit] = useState("");
  const [isPrivateContent, setIsPrivateContent] = useState<boolean>(false);

  const [posts, setPosts] = useState<any>([]);
  const [currentPost, setCurrentPost] = useState<any>(null);

  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editIsPrivateContent, setEditIsPrivateContent] = useState<boolean>(false);
  const [isPostEditing, setIsPostEditing] = useState<boolean>(false);

  const [comment, setComment] = useState("");
  const [isPrivateComment, setIsPrivateComment] = useState(false);

  const [comments, setComments] = useState<any>([]);

  const [editComment, setEditComment] = useState<any>();
  const [editIsPrivateComment, setEditIsPrivateComment] = useState<boolean>();
  const [editingCommentId, setEditingCommentId] = useState<String>("");
  const [isCommentEditing, setIsCommentEditing] = useState<boolean>(false);

  const initializePostForm = () => {
    setTitle("");
    edit("");
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
      isPrivateContent: editIsPrivateContent,
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

  const clickEditComment = async (
    e: React.FormEvent<HTMLButtonElement>,
    currentPost: any,
    comment: any
  ) => {
    e.preventDefault();
    try {
      const result = await axios.get(
        `/api/protected/posts/${currentPost.postId}/comments/${comment._id}/authorization`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(`${comment._id} 댓글 수정 권한 확인이 완료되었습니다.`);
      setEditComment(comment.comment);
      setEditIsPrivateComment(comment.isPrivateContent);
      setIsCommentEditing(!isPostEditing);
      setEditingCommentId(comment._id);
      return console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPrivateCommentChange = (e: any) => {
    e.preventDefault();
    setEditIsPrivateComment(e.target.checked);
  };

  const submitEditComment = async (
    e: React.FormEvent<HTMLFormElement>,
    currentPost: any,
    comment: any
  ) => {
    e.preventDefault();
    const toEditCommentData = {
      comment: editComment,
      isPrivateComment: editIsPrivateComment,
    };

    try {
      console.log("??????????");
      const result = await axios.put(
        `/api/protected/posts/${currentPost.postId}/comments/${comment._id}`,
        { ...toEditCommentData },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(`댓글 수정이 완료되었습니다.`);
      const editedCommentId = result.data.comment._id;
      const editedCommentIndex = comments.findIndex((item: any) => item._id === editedCommentId);

      const copiedComments = [...comments];
      copiedComments[editedCommentIndex] = {
        ...result.data.comment,
        ...toEditCommentData,
      };
      setComments(copiedComments);
      setIsCommentEditing(false);
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
      {currentPost &&
        (isPostEditing ? (
          // 글을 수정했을 때 수정 폼

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
                checked={editIsPrivateContent}
                onChange={(e) => setEditIsPrivateContent(e.target.checked)}
              ></Checkbox>
              <Button type="submit">수정하기</Button>
            </FormGroup>
          </FormContainer>
        ) : (
          <CurrentPostContainer>
            <Post
              currentPost={currentPost}
              clickEditPost={clickEditPost}
              deletePost={deletePost}
              userData={userData}
            />
            {/* 댓글 리스트 */}
            <CommentListForm
              comments={comments}
              userData={userData}
              clickEditComment={clickEditComment}
              handleDeletedComment={handleDeletedComment}
              editingCommentId={editingCommentId}
              isCommentEditing={isCommentEditing}
              editComment={editComment}
              setEditComment={setEditComment}
              editIsPrivateComment={editIsPrivateComment}
              handleEditPrivateCommentChange={handleEditPrivateCommentChange}
              currentPost={currentPost}
              submitEditComment={submitEditComment}
            />
            {/* 댓글 작성 폼 */}
            <CommentForm
              comment={comment}
              isPrivateComment={isPrivateComment}
              handleWriteComment={handleWriteComment}
              handlePrivateCommentChange={handlePrivateCommentChange}
              handleSubmitComment={handleSubmitComment}
              currentPost={currentPost}
            />
          </CurrentPostContainer>
        ))}
      {/* 게시글 */}
      <PostPageTitle>게시판</PostPageTitle>
      {posts ? (
        <PostList posts={posts} viewPost={viewPost} />
      ) : (
        <NonePostContainer>게시물이 없습니다.</NonePostContainer>
      )}
      {/* 게시글작성폼 */}
      <PostForm
        createPostTest={createPostTest}
        title={title}
        setTitle={setTitle}
        content={content}
        isPrivateContent={isPrivateContent}
        setIsPrivateContent={setIsPrivateContent}
        edit={edit}
      />
    </PostPageContainer>
  );
};

export default PostPage;
