"use server";

import { RequestService } from "@/services/RequestService";
import { revalidatePath } from "next/cache";
import { IRequest } from "../../ui/wrappers/WRequestForm";

export async function closeRequest({ id }: IRequest) {
  const result = await RequestService.fetch<void>(`/requests/${id}/close`, {
    method: "POST",
    next: {
      tags: ["requests"],
    },
  });

  revalidatePath("/requests");

  return result;
}
