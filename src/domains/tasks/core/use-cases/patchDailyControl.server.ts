"use server";

import { RequestService } from "@/services/RequestService";
import { IDailyControl } from "../../ui/wrappers/WDailyForm";

export interface IDailyControlInput {
  dailyControl: IDailyControl;
  initialCounterFile?: File;
  finalCounterFile?: File;
}

export const patchDailyControl = async (formData: FormData) => {

  const result = await RequestService.axios<IDailyControl>("/daily-controls", {
    method: "POST",
    data: formData,
  });

  return result;
};
