import { useContext } from "react";

import { useStore } from "zustand";
import { TDailyStore } from "./daily-store";
import { DailyStoreContext } from "./DailyStoreProvider";

export const useDailyStore = <T,>(selector: (store: TDailyStore) => T): T => {
  const dailyStoreContext = useContext(DailyStoreContext);

  if (!dailyStoreContext) {
    throw new Error(
      `useDailyStore must be used within DailyStoreContextProvider`
    );
  }

  return useStore(dailyStoreContext, selector);
};
