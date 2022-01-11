import { useState, useEffect, createContext, useContext } from "react";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./index";

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

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  const [user, loading, error] = useAuthState(auth);

  const values = { user, loading, error };

  return (
    <firebaseContext.Provider value={values}>
      {children}
    </firebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(firebaseContext);