"use server";

import { RequestService } from "@/services/RequestService";
import { revalidatePath } from "next/cache";
import { ICost } from "../../data/cost-columns";

export interface ICostsInput extends Omit<ICost, "id"> {}

export async function addCosts(input: ICostsInput) {
  const result = await RequestService.fetch<void>("/cost-centers?status=200", {
    method: "POST",
    body: JSON.stringify(input),
    next: {
      tags: ["costs"],
    },
  });

  revalidatePath("/costs");

  return result;
}
