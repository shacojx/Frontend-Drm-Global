import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { RoutePaths } from "src/constants/routerPaths";

import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "src/contexts/AuthContextProvider";
import { fetchUserProfile } from "src/services-business/api/authentication";
import { DialogRequestingFullscreen } from "src/components/DialogFormStatusFullscreen";

export function RequiredLoggedIn(props: PropsWithChildren) {
    const navigate = useNavigate()
    const [isRequesting, setIsRequesting] = useState<boolean>(true)
    const { user, saveAuthUser } = useContext(AuthContext)
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
      return <DialogRequestingFullscreen />
    } else {
      return <><Outlet/></>
    }
  }