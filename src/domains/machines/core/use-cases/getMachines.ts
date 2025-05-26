"use server";

import { RequestService } from "@/services/RequestService";
import { IMachine } from "../../data/machine-entities";

export async function getMachines() {
  const result = await RequestService.fetch<IMachine[]>(
    "/machinery?status=200",
    {
      method: "GET",
    }
  );

  return result;
}
