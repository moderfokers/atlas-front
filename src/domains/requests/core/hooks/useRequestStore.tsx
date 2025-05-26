import { useContext } from "react";

import { useStore } from "zustand";
import { RequestStoreContext } from "../../data/RequestProvider";
import { TRequestStore } from "../../data/request-store";

export const useRequestStore = <T,>(
  selector: (store: TRequestStore) => T
): T => {
  const requestStoreContext = useContext(RequestStoreContext);

  if (!requestStoreContext) {
    throw new Error(
      `useRequestStore must be used within RequesttoreContextProvider`
    );
  }

  return useStore(requestStoreContext, selector);
};
