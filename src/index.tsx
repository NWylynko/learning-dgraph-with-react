import React from "react";
import { render } from "react-dom";

import { App } from "./app";
import { DataProvider } from "./data/client";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";

import "@fontsource/shippori-antique";
import "./global.css";
import { FirebaseProvider } from "./firebase/provider";

render(
  <FirebaseProvider>
    <DataProvider>
      <BrowserRouter>
        <Layout>
          <App />
        </Layout>
      </BrowserRouter>
    </DataProvider>
  </FirebaseProvider>,
  document.getElementById("root")
);
