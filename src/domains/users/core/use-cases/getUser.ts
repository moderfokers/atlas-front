"use server";

import { RequestService } from "@/services/RequestService";
import { IUser } from "../../data/user-entites";

export interface IGetUserInput {
  id: string;
}

export interface IGetUserOutput extends IUser {}

export async function getUser({ id }: IGetUserInput) {
  const result = await RequestService.fetch<IGetUserOutput>(`/users/${id}`, {
    method: "GET",
  });

  return result;
}
