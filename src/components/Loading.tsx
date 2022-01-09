import { Suspense } from "react";
import styled from "styled-components";

export const Loading = styled.div`
  height: 50px;
  width: 50px;

  border-radius: 50%;
  border: 4px solid transparent;
  border-top-color: var(--color-one);
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

interface LoadingPageProps {
  text: string;
}

export const LoadingPage = ({ text }: LoadingPageProps) => {
  return (
    <FullContainer>
      <Loading />
      <span>{text}</span>
    </FullContainer>
  );
};

const FullContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 16px;
`;

export const LoadingContainer = ({ text }: LoadingPageProps) => {
  return (
    <Container>
      <Loading />
      <span>{text}</span>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  gap: 16px;
`;

interface LoadingSuspenseProps extends LoadingPageProps {
  children: React.ReactNode;
}

export const LoadingSuspense = ({ text, children }: LoadingSuspenseProps) => {
  return <Suspense fallback={<LoadingPage text={text} />}>{children}</Suspense>;
};
