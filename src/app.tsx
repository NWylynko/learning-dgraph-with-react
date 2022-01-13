import React from "react";
import { LoadingPage, LoadingSuspense } from "./components/Loading";
import { Routes, Route } from "react-router-dom";

import { useFirebase } from "./firebase/provider";

const Posts = React.lazy(() => import("./pages/Posts"));
const Post = React.lazy(() => import("./pages/Post"));
const NewPost = React.lazy(() => import("./pages/NewPost"));
const Login = React.lazy(() => import("./pages/Login"));
const User = React.lazy(() => import("./pages/User"));

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
        path="/post/new"
        element={
          <LoadingSuspense text="New Post">
            <NewPost />
          </LoadingSuspense>
        }
      />
      <Route
        path="/post/:id"
        element={
          <LoadingSuspense text="Post">
            <Post />
          </LoadingSuspense>
        }
      />
      <Route
        path="/user/:id"
        element={
          <LoadingSuspense text="Post">
            <User />
          </LoadingSuspense>
        }
      />
      <Route
        path="/"
        element={
          <LoadingSuspense text="Home">
            <Posts />
          </LoadingSuspense>
        }
      />
    </Routes>
  );
};
