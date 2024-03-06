import React, { createContext, PropsWithChildren, useState } from 'react';
import { RawResultGetUserProfile } from "../api/types";

type AuthUser = RawResultGetUserProfile

type AuthContextValue = {
  user: AuthUser | null,
  saveAuthUser: (user: AuthUser) => void,
  removeAuthUser: () => void,
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  saveAuthUser: () => {},
  removeAuthUser: () => {},
});

export function AuthContextProvider(props: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null);

  function saveAuthUser(authUserData: AuthUser) {
    setUser(authUserData);
  }

  function removeAuthUser() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, saveAuthUser, removeAuthUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}
