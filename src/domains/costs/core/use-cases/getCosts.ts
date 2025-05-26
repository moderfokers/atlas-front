"use server";

import { RequestService } from "@/services/RequestService";
import { ICost } from "../../data/cost-columns";

export async function getCosts() {
  const result = await RequestService.fetch<ICost[]>(
    "/cost-centers?status=200",
    {
      method: "GET",
    }
  );

  return result;
}
