"use server";

import { RequestService } from "@/services/RequestService";
import { IProject } from "@/domains/projects/ui/wrappers/WProjectForm";
import { IMachineClass } from "@/domains/machines/data/machine-entities";

export interface IGetRequestOuput {
  projects: IProject[];
  machineryClasses: IMachineClass[];
}

export async function getRequestAddView() {
  const result = await RequestService.fetch<IGetRequestOuput>(
    `/requests/add-view`,
    {
      method: "GET",
    }
  );

  return result;
}
