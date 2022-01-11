import React from "react";
import { Layout } from "./components/Layout";
import { LoadingSuspense } from "./components/Loading";
import { Routes, Route } from "react-router-dom";

const Home = React.lazy(() => import("./pages/Posts"));
const Post = React.lazy(() => import("./pages/Post"));

export const App = () => {
  return (
    <Layout>
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
    </Layout>
  );
};
