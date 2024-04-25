import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { Router } from "@/routes/router";
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </ChakraProvider>
  </React.StrictMode>,
);
