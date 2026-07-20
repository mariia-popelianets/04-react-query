import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import "modern-normalize/modern-normalize.css";
import App from "./components/App/App";

const queryClient = new QueryClient();

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />

      <Toaster />
    </QueryClientProvider>
  </StrictMode>,
);
