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

const PostItem = ({
  title,
  content,
  nickname,
  createdAt,
}: {
  title: string;
  content: string;
  nickname: string;
  createdAt: string;
}) => {
  return (
    <Post>
      <PostTitle>제목: {title}</PostTitle>
      <PostMeta>
        작성자: {nickname}, 작성일: {createdAt}
      </PostMeta>
      <PostContent>{content}</PostContent>
    </Post>
  );
};

interface PostPageProps {
  accessToken: string;
}
const PostPage = ({ accessToken }: PostPageProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  const [posts, setPosts] = useState<any>([]);

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
      setPosts([...posts.unshift(result.data.post)]);
      return console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        console.log("???");
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
      <PostPageTitle>게시판</PostPageTitle>
      {posts ? (
        <PostList>
          {posts.map((post: any) => (
            <PostItem
              key={post.postId}
              title={post.title}
              content={post.content}
              nickname={post.nickname}
              createdAt={post.createdAt}
            />
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
          <Button type="submit">글 작성하기</Button>
        </FormGroup>
      </FormContainer>
    </PostPageContainer>
  );
};

export default PostPage;
