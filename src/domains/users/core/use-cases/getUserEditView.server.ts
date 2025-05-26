"use server";

import { RequestService } from "@/services/RequestService";
import { IWUserFormProps } from "../../ui/wrappers/WUserForm";

export interface IGetUserOutput extends IWUserFormProps {}

export async function getUserEditView(id: string) {
  const result = await RequestService.fetch<IGetUserOutput>(
    `/users/${id}/edit-view`,
    {
      method: "GET",
    }
  );

  return result;
}
