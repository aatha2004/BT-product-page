// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import ProductPage from "../productpage/productpage";
import "./index.css"; 

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ProductPage />
  </React.StrictMode>
);
