/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore } from "zustand/vanilla";

export type TFormState = {
  form: any;
  isFetching: boolean;
};

export type TFormActions = {
  setForm: (form: any) => void;
  setIsFetching: (isFetching: boolean) => void;
};

export type TFormStore = TFormState & TFormActions;

export const defaultInitState: TFormState = {
  form: null,
  isFetching: false,
};

export const createFormStore = (initState: TFormState = defaultInitState) => {
  return createStore<TFormStore>()((set) => ({
    ...initState,
    setForm: (form) => set({ form }),
    setIsFetching: (isFetching: boolean) => set({ isFetching }),
  }));
};
