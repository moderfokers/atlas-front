"use server";

import { IFetchResponse, RequestService } from "@/services/RequestService";
import { IWDailyFormProps } from "../../ui/wrappers/WDailyForm";

export async function getDailyControl(
  id: string
): Promise<IFetchResponse<IWDailyFormProps>> {
  const endpointUrl = `/daily-controls/${id}`;

  const result = await RequestService.fetch<IWDailyFormProps>(endpointUrl, {
    method: "GET",
  });

  return result;
}
