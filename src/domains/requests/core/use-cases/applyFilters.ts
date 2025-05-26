import { IRequest } from "../../ui/wrappers/WRequestForm";
import { IRequestFilter } from "../../ui/wrappers/WRequestsFilter";

export const applyFilters = (
  filters: Partial<IRequestFilter>,
  requests: IRequest[]
): IRequest[] => {
  const statusFilter = (request: IRequest) =>
    !filters?.status || request.status?.id === filters.status.id;

  const machineClassFilter = (request: IRequest) =>
    !filters?.machineClass ||
    request.machineryClass.id === filters.machineClass.id;

  const projectFilter = (request: IRequest) =>
    !filters?.project || request.project.id === filters.project.id;

  return requests
    .filter(statusFilter)
    .filter(machineClassFilter)
    .filter(projectFilter);
};
