import { Card, CardContent } from "@/components/ui/card";

import { IRequest } from "../wrappers/WRequestForm";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";
import { WAuthLock } from "@/domains/shared/auth/ui/wrappers/WAuthLock";
import { ITask, ITaskForm } from "../../data/entities";

interface IRequestItemProps extends IRequest {
  className?: string;
  readonly?: boolean;
  onCloseRequest?: (request: IRequest) => void;
}

export const RequestItem = (props: IRequestItemProps) => {
  const {
    id,
    status,
    requestDate,
    project,
    machineryClass,
    className,
    task,
    readonly = false,
  } = props;

  return (
    <Card className={className}>
      <CardContent className="text-sm p-4 pt-2">
        <div className="flex flex-col md:flex-row">
          <div className=" p-1 md:w-6/12">
            <div className="flex flex-row justify-between">
              <span className="text-lg  font-semibold">Solicitud #{id}</span>
              <Badge color={status?.color} className="text-black mt-2">
                {status?.name}
              </Badge>
            </div>

            <p className="italic text-xs mt-0"> Creada el {requestDate}</p>

            {!readonly && (
              <div>
                {status?.name !== "POR ASIGNAR" && (
                  <Link href={`/hub/tasks/${id}`}>
                    <p className="underline font-semibold text-primary">
                      Ir a control diario
                    </p>
                  </Link>
                )}

                {status?.name === "POR ASIGNAR" && (
                  <Link href={`/hub/requests/${id}`}>
                    <p className="underline font-semibold text-primary">
                      Asignar solicitud
                    </p>
                  </Link>
                )}

                {status?.name === "ASIGNADA" && (
                  <WAuthLock permission="request_close_event" type="hide">
                    <span
                      role="button"
                      className="cursor-pointer"
                      onClick={() =>
                        props.onCloseRequest &&
                        props.onCloseRequest({ id } as IRequest)
                      }
                    >
                      <p className="underline font-semibold text-red-600">
                        Cerrar asignación
                      </p>
                    </span>
                  </WAuthLock>
                )}
              </div>
            )}
          </div>

          <div className="w-full p-2">
            <p className="mr-6">
              <b>Proyecto ➜ </b>
              {project.contractNumber}
            </p>
            <p className="mr-6">
              <b>Clase ➜ </b>
              {machineryClass.name}
            </p>
            {task?.operator && (
              <p className="mr-6">
                <b>Operario ➜ </b>
                {task?.operator.lastName + " "} {task?.operator.name}
              </p>
            )}

            {task?.costCenter && (
              <p className="mr-6">
                <b>Centro de costos ➜</b>
                {task.costCenter.name}
              </p>
            )}

            {task?.machinery && (
              <p className="mr-6">
                <b>Maquina ➜</b>
                {task.machinery.brand + " "} {task.machinery.registrationNumber}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
