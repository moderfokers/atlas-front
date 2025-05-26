"use client";

import { type ReactNode, createContext, useRef } from "react";

import { createAuthStore } from "./auth-store";
export type TAuthStoreApi = ReturnType<typeof createAuthStore>;

export const AuthStoreContext = createContext<TAuthStoreApi | undefined>(
  undefined
);

export interface IAuthStoreProviderProps {
  children: ReactNode;
}

export const AuthStoreProvider = ({ children }: IAuthStoreProviderProps) => {
  const storeRef = useRef<TAuthStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createAuthStore();
  }

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
};
