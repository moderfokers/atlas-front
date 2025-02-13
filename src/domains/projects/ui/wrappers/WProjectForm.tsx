"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WForm } from "../../../shared/form/ui/wrappers/WForm";
import { WInput } from "../../../shared/form/ui/wrappers/WInput";
import { WSubmit } from "../../../shared/form/ui/wrappers/WSubmit";

import { useFormManager } from "@/domains/shared/form/core/hooks/useFormManager";
import { addProject } from "../../core/use-cases/addProject.server";
import { Save } from "lucide-react";
import { editProject } from "../../core/use-cases/editProject.server";
import {
  clientFormSchema as clientFormSchema,
  IClient,
} from "@/domains/clients/ui/wrappers/WClientForm";
import { WTextarea } from "@/domains/shared/form/ui/wrappers/WTextarea";
import { WDate } from "@/domains/shared/form/ui/wrappers/WDate";
import { WSelect } from "@/domains/shared/form/ui/wrappers/WSelect";

import { useCrudHandler } from "@/hooks/useCrudHandler";
import { useToast } from "@/hooks/useToast";
import { NavigationService } from "@/services/NavigationService";

export interface IProjectsOutput {
  projects: IProject[];
}

export const projectSchema = z.object({
  id: z.number().optional(),
  contractNumber: z.string().min(1, "Requerido"),
  goal: z.string().min(1, "Requerido"),
  startDate: z.string().datetime({ local: true }).min(1, "Requerido"),
  endDate: z.string().datetime({ local: true }).min(1, "Requerido"),
  client: clientFormSchema,
});

export type IProject = z.infer<typeof projectSchema>;

interface IWProjectFormProps {
  project?: IProject;
  clients: IClient[];
}

export const WProjectForm = ({ project, clients }: IWProjectFormProps) => {
  const { add, edit } = useCrudHandler<IProject>({
    add: {
      action: addProject,
      onSuccess: {
        message: "👍 Proyecto guardado satisfactoriamente",
        handler: () => NavigationService.redirect("/hub/projects", 1000),
      },
    },
    edit: {
      action: editProject,
      onSuccess: {
        message: "👍 Proyecto modificado satisfactoriamente",
        handler: () => NavigationService.redirect("/hub/projects", 1000),
      },
    },
  });

  const form = useForm<IProject>({
    resolver: zodResolver(projectSchema),
    defaultValues:
      project ||
      ({
        contractNumber: "",
        goal: "",
        startDate: "",
        endDate: "",
        client: {},
      } as IProject),
  });

  useFormManager(form);

  const onSubmitHandler = async (values: IProject) => {
    if (project) edit(values);
    else add(values);
  };

  return (
    <WForm<IProject> onSubmit={onSubmitHandler}>
      <div className="flex flex-col">
        <div className="flex-auto mb-5">
          <WInput
            name="contractNumber"
            label="Numero de contrato"
            placeholder="123"
          />
        </div>
        <div className="flex-auto mb-5">
          <WTextarea name="goal" label="Objetivo" placeholder="Lorem.." />
        </div>
        <div className="flex-auto mb-5">
          <WDate name="startDate" label="Fecha inicio" />
        </div>

        <div className="flex-auto mb-5">
          <WDate name="endDate" label="Fecha fin" />
        </div>

        <div className="flex-auto mb-5">
          <WSelect<IClient>
            name="client"
            label="Clientes"
            placeholder="Seleccione un cliente"
            options={clients}
          />
        </div>

        <WSubmit text="GUARDAR" className="w-fit" icon={<Save size={15} />} />
      </div>
    </WForm>
  );
};

export default WProjectForm;
