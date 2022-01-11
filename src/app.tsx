import React from "react";
import { LoadingPage, LoadingSuspense } from "./components/Loading";
import { Routes, Route } from "react-router-dom";

import { useFirebase } from "./firebase/provider";

const Home = React.lazy(() => import("./pages/Posts"));
const Post = React.lazy(() => import("./pages/Post"));
const Login = React.lazy(() => import("./pages/Login"));

export const App = () => {
  const { loading, error, user } = useFirebase();

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

  console.log("App", user);

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
