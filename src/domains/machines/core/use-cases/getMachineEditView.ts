"use server";

import { RequestService } from "@/services/RequestService";
import { IWMachineFormProps } from "../../ui/wrappers/WMachineForm";


export interface IGetMachineInput {
  id: string;
}

export interface IGetMachineOutput extends IWMachineFormProps {}

export async function getMachineEditView({ id }: { id: number }) {
  const result = await RequestService.fetch<IGetMachineOutput>(
    `/machinery/${id}/edit-view`,
    {
      method: "GET",
    }
  );

  return result;
}
