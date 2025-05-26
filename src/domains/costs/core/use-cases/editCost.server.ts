"use server";

import { RequestService } from "@/services/RequestService";
import { revalidatePath } from "next/cache";
import { ICost } from "../../data/cost-columns";

export interface ICostsInput extends ICost {}

export async function editCosts(input: ICostsInput) {
  const result = await RequestService.fetch<void>(`/cost-centers/${input.id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });

  revalidatePath("/costs");

  return result;
}
