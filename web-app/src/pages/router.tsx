import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: 'login',
    element: <LoginPage />
  }
])
