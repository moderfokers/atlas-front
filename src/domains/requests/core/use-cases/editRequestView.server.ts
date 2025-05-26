"use server";

import { RequestService } from "@/services/RequestService";
import { IRequest } from "../../ui/wrappers/WRequestForm";
import { IMachine } from "@/domains/machines/data/machine-entities";
import { IOperator } from "@/domains/users/ui/wrappers/WUserForm";
import { ICost } from "@/domains/costs/data/cost-columns";
import { ITask } from "../../data/entities";


export interface IGetTaskOuput {
  operators: IOperator[];
  machineries: IMachine[];
  costCenters: ICost[];
  request: IRequest;
  task: ITask;
}

export async function getRequestEditView({ id }: { id: number }) {
  const result = await RequestService.fetch<IGetTaskOuput>(
    `/requests/${id}/edit-view`,
    {
      method: "GET",
    }
  );

  return result;
}
