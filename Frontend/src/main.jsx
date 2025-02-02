import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Reports from "./components/Reports";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
