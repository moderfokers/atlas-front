"use client";

import { type ReactNode, createContext, useRef } from "react";

import { createFormStore } from "./form-store";
export type TFormStoreApi = ReturnType<typeof createFormStore>;

export const FormStoreContext = createContext<TFormStoreApi | undefined>(
  undefined
);

export interface IFormStoreProviderProps {
  children: ReactNode;
}

export const FormStoreProvider = ({ children }: IFormStoreProviderProps) => {
  const storeRef = useRef<TFormStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createFormStore();
  }

  return (
    <FormStoreContext.Provider value={storeRef.current}>
      {children}
    </FormStoreContext.Provider>
  );
};
