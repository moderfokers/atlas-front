"use client";

import { ColumnDef } from "@tanstack/react-table";

import { buildEntityCell } from "@/domains/shared/data-table/core/use-cases/buildEntityCell";
import { IClient } from "@/domains/clients/ui/wrappers/WClientForm";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface IProject {
  id?: number;
  client: IClient;
  contractNumber: string;
  goal: string;
  startDate: string;
  endDate: string;
}

const formatDate = (date: string) => {
  // const formatted = new Date(date).toLocaleDateString();

  return <div className="text-right font-medium">{date}</div>;
};

export const projectColumns: ColumnDef<IProject>[] = [
  {
    accessorKey: "contractNumber",
    header: "Numero de contrato",
  },
  {
    accessorKey: "client",
    header: "Cliente",
    cell: (props) => buildEntityCell<IProject>("client", "name", props),
  },
  {
    accessorKey: "goal",
    header: "Objetivo",
  },
  {
    accessorKey: "startDate",
    header: "Fecha inicio",
  },
  {
    accessorKey: "endDate",
    header: "Fecha final",
  },
];
