import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CoinProvider from "./context/CoinProvider";
import { ClerkProvider } from "@clerk/clerk-react";
import { PriceAlertProvider } from "./context/PriceAlertProvider";

const FIVE_MINUTES_INTERVAL = 1000 * 60 * 5;

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: FIVE_MINUTES_INTERVAL,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <CoinProvider>
          <PriceAlertProvider>
            <App />
          </PriceAlertProvider>
        </CoinProvider>
      </QueryClientProvider>
    </ClerkProvider>
  </React.StrictMode>
);
