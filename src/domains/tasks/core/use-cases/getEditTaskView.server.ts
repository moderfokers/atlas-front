"use server";

import { IFetchResponse, RequestService } from "@/services/RequestService";
import { IWDailyFormProps } from "../../ui/wrappers/WDailyForm";
import { transformDate } from "../../data/transformers/transformDate";
import { transformSpreed } from "../../data/transformers/transformSpreedBool";

export async function getEditTaskView(
  requestId: string
): Promise<IFetchResponse<IWDailyFormProps>> {
  const endpointUrl = `/tasks/${requestId}/edit-view`;

  const result = await RequestService.fetch<IWDailyFormProps>(endpointUrl, {
    method: "GET",
  });

  return transformDate(transformSpreed(result));
}
