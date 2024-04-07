import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { PAYPAL_CLIENT_ID } from "./_loadEnv";
import { AuthContextProvider } from "./contexts/AuthContextProvider";
import AppRouter from "./routers/AppRouter";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StompSessionProvider } from "react-stomp-hooks";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: 10 * 1000,
    },
  },
});

const initialOptions = {
  clientId: PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
};


function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <PayPalScriptProvider options={initialOptions}>
            <StompSessionProvider url={`${process.env.REACT_APP_URL}/chat/websocket`}>
              <AppRouter />
              <ToastContainer />
            </StompSessionProvider>
          </PayPalScriptProvider>
        </AuthContextProvider>
        {/* chỉ chạy môi trường dev */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
