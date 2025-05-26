"use server";

import { RequestService } from "@/services/RequestService";
import { IWUserFormProps } from "../../ui/wrappers/WUserForm";

export interface IGetMachineOutput extends IWUserFormProps {}

export async function getUserAddView() {
  const result = await RequestService.fetch<IGetMachineOutput>(
    `/users/add-view`,
    {
      method: "GET",
    }
  );

  return result;
}
