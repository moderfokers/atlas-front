"use server";


import { RequestService } from "@/services/RequestService";
import { revalidatePath } from "next/cache";
import { IClient } from "../../ui/wrappers/WClientForm";

export interface IClientInput extends Omit<IClient, "id"> {}

export async function addClient(input: IClientInput) {
  const result = await RequestService.fetch<void>("/clients?status=200", {
    method: "POST",
    body: JSON.stringify(input),
    next: {
      tags: ["clients"],
    },
  });

  revalidatePath("/clients");

  return result;
}
