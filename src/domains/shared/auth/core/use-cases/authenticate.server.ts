"use server";

import { IRole } from "@/domains/users/data/user-entites";
import { AuthService } from "@/services/AuthService";
import { RequestService } from "@/services/RequestService";
// import { encryptPassword } from "./encryptCredentials";

export interface IAuthInput {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  email: string;
}

export interface IAuthOutput {
  accessToken: string;
  user: IUser;
  permissions: string[];
  role: IRole;
}

const transformCredentials = (input: IAuthInput): IAuthInput => {
  // const password = encryptPassword(input.password);

  return {
    ...input,
    // password,
  };
};

export async function authenticate(input: IAuthInput) {
  const result = await RequestService.fetch<IAuthOutput>("/auth?status=200", {
    method: "POST",
    body: JSON.stringify(transformCredentials(input)),
  });
  const bad = result.status >= 400;

  if (!bad && result.data?.accessToken) {
    AuthService.login(result.data);
  }

  return result;
}
