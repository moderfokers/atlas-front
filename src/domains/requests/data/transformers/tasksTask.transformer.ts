import { IFetchResponse } from "@/services/RequestService";
import { IWRequestView } from "../../ui/wrappers/WRequestsList";
import { ITask } from "../../ui/wrappers/WTaskForm";

export const transformTasksTask = (
  requestViewResponse: IFetchResponse<IWRequestView>
) => {
  if (!requestViewResponse?.data) return requestViewResponse;

  const { data } = requestViewResponse;

  const requests = data.requests.map((request) => ({
    ...request,
    task:
      Array.isArray((request as any).tasks) && (request as any).tasks.length
        ? ((request as any).tasks[0] as ITask)
        : null,
  }));

  return {
    ...requestViewResponse,
    data: {
      ...data,
      requests,
    },
  } as IFetchResponse<IWRequestView>;
};
