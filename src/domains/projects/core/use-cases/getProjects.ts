"use server";

import { IProject } from "@/domains/projects/data/project-columns";
import { RequestService } from "@/services/RequestService";

export async function getProjects() {
  const result = await RequestService.fetch<IProject[]>("/projects?status=200", {
    method: "GET",
  });

  return result;
}
