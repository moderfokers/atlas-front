"use server";


import { RequestService } from "@/services/RequestService";
import { revalidatePath } from "next/cache";
import { ITask } from "../../ui/wrappers/WDailyForm";

export interface ITaskInput extends Omit<ITask, "id"> {}

export async function addTask(input: ITaskInput) {
  const result = await RequestService.fetch<void>("/tasks?status=200", {
    method: "POST",
    body: JSON.stringify(input),
    next: {
      tags: ["tasks"],
    },
  });

  revalidatePath("/tasks");

  return result;
}
