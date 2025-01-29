"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WForm } from "../../../shared/form/ui/wrappers/WForm";
import { WInput } from "../../../shared/form/ui/wrappers/WInput";
import { WSubmit } from "../../../shared/form/ui/wrappers/WSubmit";

import { useFormManager } from "@/domains/shared/form/core/hooks/useFormManager";
import { addRequest } from "../../core/use-cases/addRequest.server";
import { Save } from "lucide-react";
// import { editRequest } from "../../core/use-cases/editRequest.server";
import { useCrudHandler } from "../../../../hooks/useCrudHandler";
import {
  IProject,
  projectSchema,
} from "@/domains/projects/ui/wrappers/WProjectForm";
import {
  IMachineClass,
  machineClassSchema,
} from "@/domains/machines/data/machine-entities";
import { WSelect } from "@/domains/shared/form/ui/wrappers/WSelect";
import { redirect } from "next/navigation";
import { NavigationService } from "@/services/NavigationService";

import { taskSchema } from "./WTaskForm";

export interface IRequestsOutput {
  requests: IRequest[];
}
export const requestStatusSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});

export const requestFormSchema = z.object({
  id: z.number().optional(),
  requestDate: z.string().datetime({ local: true }).nullable().optional(),
  status: requestStatusSchema.nullable(),
  project: projectSchema,
  machineryClass: machineClassSchema,
  task: taskSchema.optional(),
});

const defaultRequestValues = {
  date: null,
  status: null,
  project: {},
  machineryClass: {},
};

export type IRequest = z.infer<typeof requestFormSchema>;
export type IRequestStatus = z.infer<typeof requestStatusSchema>;

interface IWRequestFormProps {
  request?: IRequest;
  projects: IProject[];
  machineryClasses: IMachineClass[];
}

export const WRequestForm = ({
  request,
  projects,
  machineryClasses,
}: IWRequestFormProps) => {
  const { add } = useCrudHandler<IRequest>({
    add: {
      action: addRequest,
      onSuccess: {
        handler: () => {
          NavigationService.redirect("/hub/requests");
        },
        message: "👍 Solicitud guardada satisfactoriamente",
      },
    },
  });

  const form = useForm<IRequest>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: request || defaultRequestValues,
  });

  useFormManager(form);

  const onSubmitHandler = async (values: IRequest) => {
    add(values);
  };

  return (
    <WForm<IRequest> onSubmit={onSubmitHandler}>
      <div className="flex flex-col">
        <div className="flex-auto mb-5">
          <WSelect<IProject>
            name="project"
            label="Proyecto"
            keyValue="contractNumber"
            placeholder="Seleccione un proyecto"
            options={projects}
          />
        </div>
        <div className="flex-auto mb-5">
          <WSelect<IMachineClass>
            name="machineryClass"
            label="Tipo de maquina"
            placeholder="Seleccione un tipo de maquina"
            options={machineryClasses}
          />
        </div>
        <WSubmit text="Guardar" className="w-fit" icon={<Save size={15} />} />
      </div>
    </WForm>
  );
};

export default WRequestForm;
