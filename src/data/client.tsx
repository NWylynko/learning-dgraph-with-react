import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { useEffect, useState } from "react";
import { useFirebase } from "../firebase/provider";

const createApolloClient = (jwt: string | undefined) => {
  const httpLink = createHttpLink({
    uri: "http://192.168.0.222:8080/graphql",
    headers: {
      authorization: jwt ? `Bearer ${jwt}` : "",
    },
  });

  return new ApolloClient({
    link: httpLink,
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
