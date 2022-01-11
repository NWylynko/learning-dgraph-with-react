import { useState } from "react";
import styled from "styled-components";

import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Loading, LoadingContainer } from "../components/Loading";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const google = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Title>Login</Title>
      {error && <ErrorText>{error}</ErrorText>}
      {!loading ? (
        <>
          <Button onClick={google}>Sign In With Google</Button>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Login;

const Title = styled.h1``;

const ErrorText = styled.span`
  color: var(--color-two);
`;

const Button = styled.button`
  background-color: var(--color-one);
  color: var(--color-three);
  border: none;
  border-radius: 6px;
  padding: 8px;
  margin: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: var(--color-two);
  }
`;
