import React from "react";
import { LoadingPage, LoadingSuspense } from "./components/Loading";
import { Routes, Route } from "react-router-dom";

import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = React.lazy(() => import("./pages/Posts"));
const Post = React.lazy(() => import("./pages/Post"));
const Login = React.lazy(() => import("./pages/Login"));

export const App = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <LoadingPage text="Auth" />;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (user === null) {
    return (
      <LoadingSuspense text="Login">
        <Login />
      </LoadingSuspense>
    );
  }

  console.log(user);

  return (
    <Routes>
      <Route
        path="/post/:id"
        element={
          <LoadingSuspense text="Post">
            <Post />
          </LoadingSuspense>
        }
      />
      <Route
        path="/"
        element={
          <LoadingSuspense text="Home">
            <Home />
          </LoadingSuspense>
        }
      />
    </Routes>
  );
};
