"use server";

import { IProject } from "@/domains/projects/data/project-columns";
import { RequestService } from "@/services/RequestService";
import { revalidatePath } from "next/cache";

export interface IProjectInput extends Omit<IProject, "id"> {}

export async function addProject(input: IProjectInput) {
  const result = await RequestService.fetch<void>("/projects?status=200", {
    method: "POST",
    body: JSON.stringify(input),
    next: {
      tags: ["projects"],
    },
  });

  revalidatePath("/projects");

  return result;
}
