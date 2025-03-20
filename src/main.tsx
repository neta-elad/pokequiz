import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router";

import App from "./App";
import RandomRedirector from "./RandomRedirector";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/:id" element={<App />} />
        <Route path="/" element={<RandomRedirector />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);
