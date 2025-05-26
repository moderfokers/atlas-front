"use server";


import { RequestService } from "@/services/RequestService";
import { revalidatePath } from "next/cache";
import { IMachine } from "../../data/machine-entities";


export interface IMachineInput extends Omit<IMachine, "id"> {}

export async function addMachine(input: IMachineInput) {
  const result = await RequestService.fetch<void>("/machinery?status=200", {
    method: "POST",
    body: JSON.stringify(input),
    next: {
      tags: ["machines"],
    },
  });

  revalidatePath("/machines");

  return result;
}
