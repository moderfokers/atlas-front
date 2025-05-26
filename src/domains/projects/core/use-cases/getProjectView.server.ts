"use server";


import { IClient } from "@/domains/clients/ui/wrappers/WClientForm";
import { IProject } from "@/domains/projects/data/project-columns";

import { RequestService } from "@/services/RequestService";

export interface IProjectViewOutput {
  projects: IProject[];
  clients: IClient[];
}

export async function getProjectsView() {
  const result = await RequestService.fetch<IProjectViewOutput>(
    "/projects/view",
    {
      method: "GET",
    }
  );

  return result;
}
