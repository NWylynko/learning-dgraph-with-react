import styled from "styled-components";
import { Navigation } from "./Navigation";

export const Header = () => {
  return (
    <Container>
      <Title>Dgraph & React Discussion</Title>
      <Navigation />
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100px;
  background-color: var(--color-one);
  color: var(--color-two);
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 140px;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  border: 2px solid transparent;
  color: var(--color-three);
  margin: 4px;
  padding: 4px;
`;
