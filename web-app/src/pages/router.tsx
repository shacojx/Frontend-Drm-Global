import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import { DialogRequestingFullscreen } from "../components/DialogFormStatusFullscreen";
import { AuthContext } from "../contexts/AuthContextProvider";
import { fetchUserProfile } from "../services-business/api/authentication";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";
import { ResetPasswordPage } from "./ResetPasswordPage";
import LLCMyService from "./LLCMyService";

export const RoutePaths = {
  home: '/',
  login: '/login',
  resetPassword: '/reset-password',
  register: '/register',
  myService:'/my-service',
  services:'/service',
  myCompany:'/my-company',
}

function RequiredLoggedIn(props: PropsWithChildren) {
  const navigate = useNavigate()
  const [isRequesting, setIsRequesting] = useState<boolean>(true)
  const {user , saveAuthUser} = useContext(AuthContext)
  useEffect(() => {
    if (user) {
      return setIsRequesting(false)
    } else {
      fetchUserProfile()
        .then(user => {
          if (!user) {
            navigate(RoutePaths.login)
          } else {
            user.kycStatus = user.kycStatus || "Pending" // TODO: remove
            saveAuthUser(user)
            setIsRequesting(false)
          }
        })
        .catch(() => {
          navigate(RoutePaths.login)
        })
        .finally(() => {
          setIsRequesting(false)
        })
    }
  }, [user]);

  if (isRequesting) {
    return <DialogRequestingFullscreen  />
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
    path: RoutePaths.myService,
    element: <LLCMyService />
  },
  {
    path: '*',
    element: <RequiredLoggedIn><HomePage /></RequiredLoggedIn>
  }
])
