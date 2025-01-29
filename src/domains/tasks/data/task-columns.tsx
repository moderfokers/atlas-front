"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ITask } from "../ui/wrappers/WDailyForm";
import { buildEntityCell } from "@/domains/shared/data-table/core/use-cases/buildEntityCell";
import { IRequest } from "@/domains/requests/ui/wrappers/WRequestForm";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const taskColumns: ColumnDef<ITask>[] = [
  {
    accessorKey: "request",
    header: "Solicitud",
    cell: (props) => {
      return buildEntityCell<ITask>("request", "id", props);
    },
  },
  {
    accessorKey: "request",
    header: "Proyecto",
    cell: (props) => {
      return buildEntityCell<ITask>("request", "id", props);
    },
  },
  {
    accessorKey: "Proyecto",
    header: "Taske empresa",
  },
  {
    accessorKey: "Maquina",
    header: "machine",
  },

];
