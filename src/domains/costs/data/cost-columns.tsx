"use client";

import { Checkbox } from "@/components/ui/checkbox";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface ICost {
  id?: number;
  name: string;
  code: string;
  startDate: string;
  endDate: string;
}

export const costColumns: ColumnDef<ICost>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "code",
    header: "Codigo",
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
