"use server";

import { IFetchResponse, RequestService } from "@/services/RequestService";
import { IWDailyFormProps } from "../../ui/wrappers/WDailyForm";
import { transformDate } from "../../data/transformers/transformDate";

export async function getEditTaskView(
  taskId: string
): Promise<IFetchResponse<IWDailyFormProps>> {
  const endpointUrl = `/tasks/${taskId}/edit-view`;

  const result = await RequestService.fetch<IWDailyFormProps>(endpointUrl, {
    method: "GET",
  });

  return transformDate(result);
}
