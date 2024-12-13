import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./app";
import "./global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </div>
  </React.StrictMode>
);
