import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import { AuthContextProvider } from './contexts/AuthContextProvider';
import AppRouter from './routers/AppRouter';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  },
})

function App() {
  return <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
    </QueryClientProvider>
  </BrowserRouter>
}

export default App;
