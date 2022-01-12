import { useState, useEffect, createContext, useContext } from "react";
import { IdTokenResult, User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, addUserIdToClaim } from "./index";

interface FirebaseContext {
  user?: User | null;
  loading: boolean;
  error?: Error | null;
}

const firebaseContext = createContext<FirebaseContext>({
  user: null,
  loading: true,
  error: null,
});

interface FirebaseProviderProps {
  children: React.ReactNode;
}

const AppUrl = "https://learning-dgraph-with-react.web.app/";

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  const [user, loading, error] = useAuthState(auth);
  const [idToken, setIdToken] = useState<IdTokenResult | undefined>(undefined);
  const [loadingToken, setLoadingToken] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoadingToken(true);
      const newIdToken = await user.getIdTokenResult();
      console.log(newIdToken);
      setIdToken(newIdToken);
      setLoadingToken(false);
    })();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    if (!idToken) return;
    if (idToken?.claims[AppUrl]) return;
    (async () => {
      const result = await addUserIdToClaim();
      console.log(result);
    })();
  }, [user, idToken]);

  const values = { user, loading: loading || loadingToken, error };

  return (
    <firebaseContext.Provider value={values}>
      {children}
    </firebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(firebaseContext);
