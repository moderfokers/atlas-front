import { useContext } from "react";

import { useStore } from "zustand";
import { TAuthStore } from "../../data/auth-store";
import { AuthStoreContext } from "../../data/AuthStoreProvider";

export const useAuthStore = <T,>(selector: (store: TAuthStore) => T): T => {
  const authStoreContext = useContext(AuthStoreContext);

  if (!authStoreContext) {
    throw new Error(
      `useAuthStore must be used within AuthStoreContextProvider`
    );
  }

  return useStore(authStoreContext, selector);
};
