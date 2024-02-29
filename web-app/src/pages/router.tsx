import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { ResetPasswordPage } from "./ResetPasswordPage";

export const RoutePaths = {
  home: '/',
  login: '/login',
  resetPassword: '/reset-password',
  register: '/register',
}

export const router = createBrowserRouter([
  {
    path: RoutePaths.home,
    element: <HomePage />,
  },
  {
    path: RoutePaths.login,
    element: <LoginPage />
  },
  {
    path: RoutePaths.resetPassword,
    element: <ResetPasswordPage />
  },
  {
    path: RoutePaths.register,
    element: <HomePage />
  },
])
