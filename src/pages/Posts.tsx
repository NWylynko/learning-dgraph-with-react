import styled from "styled-components";
import { useAllPostsSubscription } from "./types/Posts";
import { LoadingContainer } from "../components/Loading";

import { FaRegComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PostsPage = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useAllPostsSubscription();

  if (loading) {
    return <LoadingContainer text="Loading Posts" />;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <HeaderItem>Posts</HeaderItem>
          <HeaderItem>Category</HeaderItem>
          <HeaderItem>Responses</HeaderItem>
        </tr>
      </thead>
      <tbody>
        {data?.queryPost?.map((post) => (
          <Row key={post?.id} onClick={() => navigate(`/post/${post?.id}`)}>
            <TitleSection>
              <UserImage src={post?.author.avatarImg || ""} />
              <Title>{post?.title}</Title>
              <Author>
                {post?.author.displayName || post?.author.username}
              </Author>
            </TitleSection>
            <td>
              <span>{post?.category.name}</span>
            </td>
            <ResponseSection>
              <HeartIcon />
              <span>{post?.commentsAggregate?.count} Replies</span>
            </ResponseSection>
          </Row>
        ))}
      </tbody>
    </Table>
  );
};

export default PostsPage;

const Table = styled.table`
  width: calc(100vw - 64px);
  margin: 32px;
`;
const HeaderItem = styled.th`
  text-align: left;
`;
const Row = styled.tr`
  &:hover {
    cursor: pointer;
  }
`;
const TitleSection = styled.td`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "image title"
    "image author";
`;
const UserImage = styled.img`
  grid-area: image;
  width: 50px;
  height: 50px;
  border-radius: 6px;
  margin: 6px;
  background-color: var(--color-one);
`;
const Title = styled.h2`
  grid-area: title;
  margin: 0;
  color: var(--color-one);
`;
const Author = styled.h4`
  grid-area: author;
  margin: 0;
`;
const ResponseSection = styled.td``;
const HeartIcon = styled(FaRegComment)`
  color: var(--color-one);
  margin-right: 8px;
  transform: translateY(2px);
`;
