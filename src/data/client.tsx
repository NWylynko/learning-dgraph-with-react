import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/link-ws";
import { useEffect, useState } from "react";
import { useFirebase } from "../firebase/provider";

const createApolloClient = (jwt: string | undefined) => {
  const httpLink = createHttpLink({
    uri: "http://192.168.0.222:8080/graphql",
    headers: {
      authorization: jwt ? `Bearer ${jwt}` : "",
    },
  });

  const wsLink = new WebSocketLink({
    uri: `ws://192.168.0.222:8080/graphql`,
    options: {
      reconnect: true,
    },
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
};

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const { user } = useFirebase();

  const [jwt, setJwt] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (user !== null) {
      (async () => {
        const newJwt = await user?.getIdToken();
        setJwt(newJwt);
      })();
    }
  }, [user]);

  return (
    <ApolloProvider client={createApolloClient(jwt)}>{children}</ApolloProvider>
  );
};
