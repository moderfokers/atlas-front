"use server";

import { IProject } from "@/domains/projects/data/project-columns";
import { RequestService } from "@/services/RequestService";

export interface IGetProjectInput {
  id: string;
}

export interface IGetProjectOutput extends IProject {}

export async function getProject({ id }: IGetProjectInput) {
  const result = await RequestService.fetch<IGetProjectOutput>(`/projects/${id}`, {
    method: "GET",
  });

  return result;
}
