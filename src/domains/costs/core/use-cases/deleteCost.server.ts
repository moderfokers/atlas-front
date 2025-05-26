"use server";

import { RequestService } from "@/services/RequestService";
import { revalidatePath } from "next/cache";
import { ICost } from "../../data/cost-columns";

export interface ICostsInput extends ICost {}

export async function deleteCost(input: ICostsInput) {
  const result = await RequestService.fetch<void>(`/cost-centers/${input.id}`, {
    method: "DELETE",
  });

  revalidatePath("/costs");

  return result;
}
