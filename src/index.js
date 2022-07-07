import React from "react";
import "antd/dist/antd.css";
import { AuthProvider } from "./context";
import ReactDOM from "react-dom/client";
import "./styles.css";
import App from "./app";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
