import { useContext } from "react";

import { useStore } from "zustand";
import { TFormStore } from "../../data/form-store";
import { FormStoreContext } from "../../data/FormStoreProvider";

export const useFormStore = <T,>(selector: (store: TFormStore) => T): T => {
  const formStoreContext = useContext(FormStoreContext);

  if (!formStoreContext) {
    throw new Error(
      `useFormStore must be used within FormStoreContextProvider`
    );
  }

  return useStore(formStoreContext, selector);
};
