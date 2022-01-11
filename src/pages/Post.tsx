import { useParams } from "react-router-dom";
import styled from "styled-components";
import { LoadingContainer } from "../components/Loading";
import { useGetPostQuery } from "./types/Post";

const Post = () => {
  const { id } = useParams();

  if (!id) {
    return <span>No post id provided</span>;
  }

  const { data, loading, error } = useGetPostQuery({ variables: { id } });

  if (loading) {
    return <LoadingContainer text="Loading Post" />;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  const post = data?.getPost;

  return (
    <Container>
      <Title>{post?.title}</Title>
      <Category>{post?.category.name}</Category>
      <AuthorSection>
        <UserImage src={post?.author.avatarImg || ""} />
        <Author>{post?.author.displayName || post?.author.username}</Author>
        <DatePublished>
          {post?.datePublished || "at some unknown time"}
        </DatePublished>
      </AuthorSection>
      <Content>{post?.text}</Content>
    </Container>
  );
};

export default Post;

const Container = styled.div`
  padding: 8px;
  max-width: 60ch;
  margin: auto;
`;
const Title = styled.h2`
  margin-top: 8px;
  margin-bottom: 8px;
`;
const Category = styled.span`
  margin: 8px;
  color: var(--color-two);
`;
const AuthorSection = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "image title"
    "image author";
  margin-top: 8px;
  margin-bottom: 8px;
`;
const UserImage = styled.img`
  grid-area: image;
  width: 50px;
  height: 50px;
  border-radius: 6px;
  margin: 6px;
  margin-left: 0px;
  background-color: var(--color-one);
`;
const Author = styled.h3`
  grid-area: title;
  margin: 0;
  color: var(--color-one);
`;
const DatePublished = styled.h4`
  grid-area: author;
  margin: 0;
`;
const Content = styled.p``;
