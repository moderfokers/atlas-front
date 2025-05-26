"use server";


import { RequestService } from "@/services/RequestService";
import { revalidatePath } from "next/cache";
import { IRequest } from "../../ui/wrappers/WRequestForm";

export interface IRequestInput extends Omit<IRequest, "id"> {}

export async function addRequest(input: IRequestInput) {
  const result = await RequestService.fetch<void>("/requests?status=200", {
    method: "POST",
    body: JSON.stringify(input),
    next: {
      tags: ["requests"],
    },
  });

  revalidatePath("/requests");

  return result;
}
