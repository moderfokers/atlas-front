"use server";


import { RequestService } from "@/services/RequestService";
import { IClient } from "../../ui/wrappers/WClientForm";

export async function getClients() {
  const result = await RequestService.fetch<IClient[]>("/clients?status=200", {
    method: "GET",
  });

  return result;
}
