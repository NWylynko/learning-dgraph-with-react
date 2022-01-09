import React from "react";
import { render } from "react-dom";

import { App } from "./app";
import { DataProvider } from "./data/client";
import { BrowserRouter } from "react-router-dom";

import "@fontsource/shippori-antique";
import "./global.css";

render(
  <DataProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DataProvider>,
  document.getElementById("root")
);
