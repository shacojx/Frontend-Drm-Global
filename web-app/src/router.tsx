import { createBrowserRouter } from "react-router-dom";
import { OneFormLayout } from "./layouts/OneFormLayout";
import { LoginPage } from "./pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <OneFormLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />
      }
    ],
  },
])
