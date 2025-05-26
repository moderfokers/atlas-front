"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { WForm } from "../../../shared/form/ui/wrappers/WForm";
import { WSubmit } from "../../../shared/form/ui/wrappers/WSubmit";
import { useFormManager } from "@/domains/shared/form/core/hooks/useFormManager";
import { Save } from "lucide-react";
import { useCrudHandler } from "../../../../hooks/useCrudHandler";
import { IMachine } from "@/domains/machines/data/machine-entities";
import { IOperator } from "@/domains/users/ui/wrappers/WUserForm";
import { IGetTaskOuput } from "../../core/use-cases/editRequestView.server";
import { addTask } from "../../core/use-cases/addTask.server";
import { ICost } from "@/domains/costs/data/cost-columns";
import { Separator } from "@/components/ui/separator";
import { WSelectList } from "@/domains/shared/form/ui/wrappers/WSelectList";
import { NavigationService } from "@/services/NavigationService";
import { ITaskForm, taskSchemaForm } from "../../data/entities";
import { getDefaultTaskValues } from "../../core/use-cases/getDefaultTaskValues";

interface IWRequestFormProps extends IGetTaskOuput {}

export const WTaskForm = ({
  request,
  operators,
  machineries,
  costCenters,
}: IWRequestFormProps) => {
  const { add } = useCrudHandler<ITaskForm>({
    add: {
      action: addTask,
      onSuccess: {
        handler: () => NavigationService.redirect("/hub/requests"),
        message: "👍 Asignación registrada satisfactoriamente",
      },
    },
  });

  const form = useForm<ITaskForm>({
    resolver: zodResolver(taskSchemaForm),
    defaultValues: getDefaultTaskValues(request),
  });

  useFormManager(form);

  const onSubmitHandler = async (values: ITaskForm) => add(values);

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
      <WForm<ITaskForm> onSubmit={onSubmitHandler}>
        <div className="flex flex-col">
          <div className="flex-auto mb-5">
            <WSelectList<Partial<IOperator>>
              name="operator"
              label="Operador"
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
          <WSubmit text="GUARDAR" className="w-fit" icon={<Save size={15} />} />
        </div>
      </WForm>
    </>
  );
};

export default WTaskForm;
