import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { IRequest } from "../wrappers/WRequestForm";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface IRequestItemProps extends IRequest {
  className?: string;
  readonly?: boolean;
}

export const RequestItem = (props: IRequestItemProps) => {
  // Request
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

  const titleFragment = (
    <span className="text-lg underline font-semibold text-primary">
      Solicitud #{id}
    </span>
  );

  return (
    <Card className={className}>
      <CardContent className="text-sm p-4 pt-2">
        <div className="flex flex-col md:flex-row">
          <div className=" p-1 md:w-6/12">
            <div className="flex flex-row justify-between">
              {readonly ? (
                titleFragment
              ) : (
                <Link href={`/hub/requests/${id}`}>{titleFragment}</Link>
              )}

              <Badge color={status?.color} className="text-black mt-2">
                {status?.name}
              </Badge>
            </div>

            <p className="italic text-xs mt-0"> Creada el {requestDate}</p>

            {!readonly && (
              <Link href={`/hub/tasks/${id}`}>
                <p className="underline font-semibold text-primary">
                  Ir a control diario
                </p>
              </Link>
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
