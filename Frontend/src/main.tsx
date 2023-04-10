import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { AppProvider } from "./contexts";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
        <ToastContainer />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
