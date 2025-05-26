"use server";

import { IProject } from "@/domains/projects/data/project-columns";
import { RequestService } from "@/services/RequestService";
import { revalidatePath } from "next/cache";

export interface IProjectInput extends IProject {}

export async function deleteProject(input: IProjectInput) {
  const result = await RequestService.fetch<void>(`/projects/${input.id}`, {
    method: "DELETE",
  });

  revalidatePath("/projects");

  return result;
}
