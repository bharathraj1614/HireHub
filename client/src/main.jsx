import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { FakeAuthContextProvider } from "./Pages/FakeAuthContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FakeAuthContextProvider>
      <App />
    </FakeAuthContextProvider>
    <ToastContainer position="top-right" autoClose={3000} />
  </React.StrictMode>
);
