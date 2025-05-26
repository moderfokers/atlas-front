"use server";

import { RequestService } from "@/services/RequestService";
import { revalidatePath } from "next/cache";
import { IMachine } from "../../data/machine-entities";

export interface IMachineInput extends IMachine {}

export async function deleteMachine(input: IMachineInput) {
  const result = await RequestService.fetch<void>(`/machinery/${input.id}`, {
    method: "DELETE",
  });

  revalidatePath("/machines");

  return result;
}
