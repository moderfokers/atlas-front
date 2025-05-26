"use server";

import { IProject } from "@/domains/projects/data/project-columns";
import { RequestService } from "@/services/RequestService";
import { revalidatePath } from "next/cache";

export interface IProjectInput extends IProject {}

export async function editProject(input: IProjectInput) {
  const result = await RequestService.fetch<void>(`/projects/${input.id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });

  revalidatePath("/projects");

  return result;
}
