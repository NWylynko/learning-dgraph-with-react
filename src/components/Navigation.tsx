import { Link } from "react-router-dom";
import styled from "styled-components";
import { useFirebase } from "../firebase/provider";

export const Navigation = () => {
  const { user, loading, error } = useFirebase();
  return (
    <Container>
      <Link to="/">Home</Link>
      {/* <Link to="/post/new">New Post</Link> */}
      <Link to={`/user/${user?.uid}`}>
        {loading ? "loading" : error ? "error" : user?.displayName}
      </Link>
    </Container>
  );
};

const Container = styled.nav`
  display: flex;
  align-items: center;
`;
