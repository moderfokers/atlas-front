"use server";


import { RequestService } from "@/services/RequestService";
import { revalidatePath } from "next/cache";
import { ITask } from "../../ui/wrappers/WDailyForm";

export interface ITaskInput extends ITask {}

export async function deleteTask(input: ITaskInput) {
  const result = await RequestService.fetch<void>(`/tasks/${input.id}`, {
    method: "DELETE",
  });

  revalidatePath("/tasks");

  return result;
}
