import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import { DialogRequestingFullscreen } from "../components/DialogFormStatusFullscreen";
import { AuthContext } from "../contexts/AuthContextProvider";
import { fetchUserProfile } from "../services-business/api/authentication";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { ResetPasswordPage } from "./ResetPasswordPage";

export const RoutePaths = {
  home: '/',
  login: '/login',
  resetPassword: '/reset-password',
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
    path: '*',
    element: <RequiredLoggedIn><HomePage /></RequiredLoggedIn>
  }
])
