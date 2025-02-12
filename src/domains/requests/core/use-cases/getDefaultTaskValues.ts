import { ITaskForm } from "../../data/entities";
import { IRequest } from "../../ui/wrappers/WRequestForm";

export const getDefaultTaskValues = (request: IRequest) => {
  return {
    requestId: request.id as number,
    operator: null,
    machinery: null,
    costCenter: null,
  } as ITaskForm;
};
