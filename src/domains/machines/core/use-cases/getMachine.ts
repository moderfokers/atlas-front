"use server";

import { RequestService } from "@/services/RequestService";
import { IMachine } from "../../data/machine-entities";

export interface IGetMachineInput {
  id: string;
}

export interface IGetMachineOutput extends IMachine {}

export async function getMachine({ id }: IGetMachineInput) {
  const result = await RequestService.fetch<IGetMachineOutput>(
    `/machinery/${id}`,
    {
      method: "GET",
    }
  );

  return result;
}
