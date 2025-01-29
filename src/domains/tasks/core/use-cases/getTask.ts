"use server";


import { ITask } from "@/domains/requests/ui/wrappers/WTaskForm";
import { RequestService } from "@/services/RequestService";


export interface IGetTaskInput {
  id: string;
}

export interface IGetTaskOutput extends ITask {}

export async function getTask({ id }: IGetTaskInput) {
  const result = await RequestService.fetch<ITask>(`/tasks/${id}`, {
    method: "GET",
  });

  return result;
}
