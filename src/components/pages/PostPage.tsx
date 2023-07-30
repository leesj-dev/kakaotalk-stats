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

interface PostPageProps {
  accessToken: string;
}
const PostPage = ({ accessToken }: PostPageProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const [posts, setPosts] = useState<any>([]);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [isSameAuthor, setIsSameAuthor] = useState<any>(false);

  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editIsPrivate, setEditIsPrivate] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const initializeForm = () => {
    setTitle("");
    setContent("");
    setIsPrivate(false);
  };

  const createPostTest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "/api/protected/posts/create",
        {
          title,
          content,
          isPrivate,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(`${title} 게시물 작성이 완료되었습니다.`);
      initializeForm();
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
      setEditIsPrivate(post.isPrivate);
      setIsEditing(!isEditing);
      return console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const editPost = async (e: React.FormEvent<HTMLFormElement>, post: any) => {
    e.preventDefault();
    const toEditData = {
      title: editTitle,
      content: editContent,
      isPrivate: editIsPrivate,
    };

    try {
      const result = await axios.put(
        `/api/protected/posts/${post.postId}/edit`,
        { ...toEditData },
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
        ...toEditData,
      };
      setPosts(copiedPosts);
      setCurrentPost(copiedPosts[editedPostIndex]);
      setIsEditing(false);
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

  return (
    <PostPageContainer>
      {currentPost &&
        (isEditing ? (
          <FormContainer>
            <FormGroup onSubmit={(e) => editPost(e, currentPost)}>
              <Label>제목</Label>
              <Input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
              <Label>내용</Label>
              <Textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
              <Label>비밀글</Label>
              <Checkbox
                type="checkBox"
                checked={editIsPrivate}
                onChange={(e) => setEditIsPrivate(e.target.checked)}
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
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          ></Checkbox>
          <Button type="submit">글쓰기</Button>
        </FormGroup>
      </FormContainer>
    </PostPageContainer>
  );
};

export default PostPage;
