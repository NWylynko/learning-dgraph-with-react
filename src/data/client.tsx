import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const createApolloClient = () => {
  const httpLink = createHttpLink({
    uri: "http://localhost:8080/graphql",
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => (
  <ApolloProvider client={createApolloClient()}>{children}</ApolloProvider>
);