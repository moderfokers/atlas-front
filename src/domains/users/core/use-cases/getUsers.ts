"use server";


import { RequestService } from "@/services/RequestService";
import { IUser } from "../../data/user-entites";


export async function getUsers() {
  const result = await RequestService.fetch<IUser[]>("/users?status=200", {
    method: "GET",
  });

  return result;
}
