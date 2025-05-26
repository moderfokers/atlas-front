/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore } from "zustand/vanilla";
import { IAuthOutput } from "../core/use-cases/authenticate.server";

export type TAuthState = {
  userMetadata: IAuthOutput;
};

export type TAuthActions = {
  setUserMetadata: (userMetadata: IAuthOutput) => void;
};

export type TAuthStore = TAuthState & TAuthActions;

export const defaultInitState: TAuthState = {
  userMetadata: {} as IAuthOutput,
};

export const createAuthStore = (initState: TAuthState = defaultInitState) => {
  return createStore<TAuthStore>()((set) => ({
    ...initState,
    setUserMetadata: (userMetadata: IAuthOutput) => set({ userMetadata }),
  }));
};
