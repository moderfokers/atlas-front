"use server";

import { RequestService } from "@/services/RequestService";
import { IWMachineFormProps } from "../../ui/wrappers/WMachineForm";

export interface IGetMachineInput {
  id: string;
}

export interface IGetMachineOutput extends IWMachineFormProps {}

export async function getMachineAddView() {
  const result = await RequestService.fetch<IGetMachineOutput>(
    `/machinery/add-view`,
    {
      method: "GET",
    }
  );

  return result;
}
