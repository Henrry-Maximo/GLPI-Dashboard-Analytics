import React from "react";
import ReactDOM from "react-dom/client";

import "./global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./app";

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
