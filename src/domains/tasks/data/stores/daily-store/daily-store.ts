/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore } from "zustand/vanilla";
import { IDailyControl } from "../../entities";

export type TDailyState = {
  dailyControl: IDailyControl;
  date: Date | null;
};

export type TDailyStateActions = {
  setDailyControl: (dailyControl: IDailyControl) => void;
  setDate: (date: Date) => void;
};

export type TDailyStore = TDailyState & TDailyStateActions;

export const defaultInitState: TDailyState = {
  dailyControl: {} as IDailyControl,
  date: null,
};

export const createDailyStore = (initState: TDailyState = defaultInitState) => {
  return createStore<TDailyStore>()((set) => ({
    ...initState,
    setDailyControl: (dailyControl: IDailyControl) => set({ dailyControl }),
    setDate: (date: Date) => set({ date }),
  }));
};
