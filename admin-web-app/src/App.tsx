import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import './App.css';
import { AuthContextProvider } from './contexts/AuthContextProvider';
import { router } from "./pages/router";

export const queryClient = new QueryClient()

function App() {
  return <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </QueryClientProvider>
}

export default App;
