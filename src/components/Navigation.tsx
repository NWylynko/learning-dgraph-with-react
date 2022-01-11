import { Link } from "react-router-dom";
import styled from "styled-components";

export const Navigation = () => {
  return (
    <Container>
      <Link to="/">Home</Link>
      {/* <Link to="/post/new">New Post</Link> */}
    </Container>
  );
};

const Container = styled.nav`
  display: flex;
  align-items: center;
`;
