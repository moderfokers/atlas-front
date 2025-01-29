"use server";

import { IFetchResponse, RequestService } from "@/services/RequestService";
import { IWRequestView } from "../../ui/wrappers/WRequestsList";
import { AuthService } from "@/services/AuthService";
import { transformTasksTask } from "../../data/transformers/tasksTask.transformer";

const getUrl = () => {
  const {
    role,
    user: { id },
  } = AuthService.getUserMetadata();
  const isOperator = role.name.toLocaleLowerCase() === "operario";

  return isOperator ? `/requests/operator/${id}/view` : "/requests/view";
};

export async function getRequestsView(): Promise<
  IFetchResponse<IWRequestView>
> {
  const endpointUrl = getUrl();

  const result = await RequestService.fetch<IWRequestView>(endpointUrl, {
    method: "GET",
  });

  return transformTasksTask(result);
  // return mock as unknown as IFetchResponse<IWRequestView>;
}
