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

import { useCrudHandler } from "../../../../hooks/useCrudHandler";
import { IProject } from "@/domains/projects/ui/wrappers/WProjectForm";
import {
  IMachine,
  IMachineClass,
  machineFormSchema,
} from "@/domains/machines/data/machine-entities";
import { WSelect } from "@/domains/shared/form/ui/wrappers/WSelect";
import { redirect } from "next/navigation";
import {
  IOperator,
  operatorSchema,
} from "@/domains/users/ui/wrappers/WUserForm";
import { costCenterSchema } from "@/domains/costs/ui/wrappers/WCostForm";
import { IGetTaskOuput } from "../../core/use-cases/editRequestView.server";
import { addTask } from "../../core/use-cases/addTask.server";
import { IRequest } from "./WRequestForm";
import { ICost } from "@/domains/costs/data/cost-columns";
import { Separator } from "@/components/ui/separator";
import { WSelectList } from "@/domains/shared/form/ui/wrappers/WSelectList";
import { NavigationService } from "@/services/NavigationService";
import { userFormSchema } from "@/domains/users/data/user-entites";

const getDefaultTaskValues = (request: IRequest) => {
  return {
    requestId: request.id as number,
    operator: {},
    machinery: {},
    costCenter: {},
  } as ITask;
};

export const taskSchema = z.object({
  id: z.number().optional(),
  requestId: z.number().optional(),
  operator: z.intersection(operatorSchema, userFormSchema),
  machinery: machineFormSchema,
  costCenter: costCenterSchema,
  // request: z.lazy(() => requestFormSchema.optional()),
});

export type ITask = z.infer<typeof taskSchema>;

interface IWRequestFormProps extends IGetTaskOuput {}

export const WTaskForm = ({
  request,
  operators,
  machineries,
  costCenters,
  task
}: IWRequestFormProps) => {
  const { add } = useCrudHandler<ITask>({
    add: {
      action: addTask,
      onSuccess: {
        handler: () => NavigationService.redirect("/hub/requests"),
        message: "👍 Solicitud guardada satisfactoriamente",
      },
    },
  });

  const form = useForm<ITask>({
    resolver: zodResolver(taskSchema),
    defaultValues: getDefaultTaskValues(request),
  });

  useFormManager(form);

  const onSubmitHandler = async (values: ITask) => {
    add(values);
  };

  return (
    <>
      <div>
        <p className="text-lg font-semibold">Solicitud #{request.id}</p>
        <p className="text-sm">
          <b>Proyecto:</b> {request.project.client.name} - #
          {request.project.contractNumber}
        </p>
        <p className="text-sm">
          <b>Clase de maquina:</b> {request.machineryClass.name}
        </p>
      </div>
      <Separator className="my-4" />
      <WForm<ITask> onSubmit={onSubmitHandler}>
        <div className="flex flex-col">
          <div className="flex-auto mb-5">
            <WSelectList<IOperator>
              name="operator"
              label="Operador"
              // keyValue="operatorId"
              placeholder="Seleccione un operador"
              rows={operators}
              columns={[
                {
                  key: "lastName",
                  display: "Apellido",
                },
                {
                  key: "name",
                  display: "Nombre",
                },
                {
                  key: "contractStatus",
                  display: "Estado",
                },
              ]}
            />
          </div>
          <div className="flex-auto mb-5">
            <WSelectList<IMachine>
              name="machinery"
              label="Maquina"
              // keyValue="operatorId"
              placeholder="Seleccione una maquina"
              rows={machineries}
              columns={[
                {
                  key: "registrationNumber",
                  display: "Registro",
                },
                {
                  key: "brand",
                  display: "Marca",
                },
                {
                  key: "status",
                  display: "Estado",
                  cellTemplate: (row) => row.status.name,
                },
              ]}
            />
          </div>
          <div className="flex-auto mb-5">
            <WSelectList<ICost>
              name="costCenter"
              label="Centro de costos"
              // keyValue="operatorId"
              placeholder="Seleccione un centro de costos"
              rows={costCenters}
              columns={[
                {
                  key: "name",
                  display: "Nombre",
                },
                {
                  key: "code",
                  display: "Codigo",
                },
              ]}
            />
          </div>
          <WSubmit text="Guardar" className="w-fit" icon={<Save size={15} />} />
        </div>
      </WForm>
    </>
  );
};

export default WTaskForm;
