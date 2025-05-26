"use client";

import { type ReactNode, createContext, useRef } from "react";

import { createDailyStore } from "./daily-store";
export type TDailyStoreApi = ReturnType<typeof createDailyStore>;

export const DailyStoreContext = createContext<TDailyStoreApi | undefined>(
  undefined
);

export interface TDailyStoreProviderProps {
  children: ReactNode;
}

export const DailyStoreProvider = ({ children }: TDailyStoreProviderProps) => {
  const storeRef = useRef<TDailyStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createDailyStore();
  }

  return (
    <DailyStoreContext.Provider value={storeRef.current}>
      {children}
    </DailyStoreContext.Provider>
  );
};
