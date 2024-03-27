import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from "react-router-dom";
import './App.css';
import { AuthContextProvider } from './contexts/AuthContextProvider';
import { router } from "./pages/router";
import 'react-toastify/dist/ReactToastify.min.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: 30 * 1000
    }
  },
})


function App() {
  return <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
    <ToastContainer />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
}

export default App;
