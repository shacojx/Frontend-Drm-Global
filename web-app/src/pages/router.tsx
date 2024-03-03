import { PropsWithChildren, useContext } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";
import { ResetPasswordPage } from "./ResetPasswordPage";

export const RoutePaths = {
  home: '/',
  login: '/login',
  resetPassword: '/reset-password',
  register: '/register',
}

function RequiredLoggedIn(props: PropsWithChildren) {
  const {user} = useContext(AuthContext)
  if (!user) {
    return <Navigate to="/login" />
  } else {
    return <>{props.children}</>
  }
}


export const router = createBrowserRouter([
  {
    path: RoutePaths.home,
    element: <RequiredLoggedIn><HomePage /></RequiredLoggedIn>,
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
    element: <RegisterPage />
  },
  {
    path: '*',
    element: <RequiredLoggedIn><HomePage /></RequiredLoggedIn>
  }
])
