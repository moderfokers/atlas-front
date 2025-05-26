"use client";

import { type ReactNode, createContext, useRef } from "react";

import { createRequestStore } from "./request-store";
import { IRequest } from "../ui/wrappers/WRequestForm";
export type TRequestStoreApi = ReturnType<typeof createRequestStore>;

export const RequestStoreContext = createContext<TRequestStoreApi | undefined>(
  undefined
);

export interface IRequestStoreProviderProps {
  children: ReactNode;
  requests: IRequest[];
}

export const RequestStoreProvider = ({
  children,
  requests,
}: IRequestStoreProviderProps) => {
  const storeRef = useRef<TRequestStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createRequestStore({
      requests,
      initialRequests: requests,
      filters: {},
    });
  }

  return (
    <RequestStoreContext.Provider value={storeRef.current}>
      {children}
    </RequestStoreContext.Provider>
  );
};
