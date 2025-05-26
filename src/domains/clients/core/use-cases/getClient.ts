"use server";


import { RequestService } from "@/services/RequestService";
import { IClient } from "../../ui/wrappers/WClientForm";

export interface IGetClientInput {
  id: string;
}

export interface IGetClientOutput extends IClient {}

export async function getClient({ id }: IGetClientInput) {
  const result = await RequestService.fetch<IClient>(`/clients/${id}`, {
    method: "GET",
  });

  return result;
}
