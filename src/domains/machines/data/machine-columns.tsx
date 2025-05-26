"use client";

import { buildEntityCell } from "@/domains/shared/data-table/core/use-cases/buildEntityCell";
import { ColumnDef } from "@tanstack/react-table";
import { IMachine } from "./machine-entities";


export const machineColumns: ColumnDef<IMachine>[] = [
  {
    accessorKey: "machineClass",
    header: "Tipo",
    cell: (props) => {
      return buildEntityCell<IMachine>("machineClass", "name", props);
    },
  },
  {
    accessorKey: "supplier",
    header: "Proveedor",
    cell: (props) => buildEntityCell<IMachine>("supplier", "name", props),
  },

  {
    accessorKey: "status",
    header: "Estado",
    cell: (props) => buildEntityCell<IMachine>("status", "name", props),
  },
  {
    accessorKey: "brand",
    header: "Marca",
  },
  {
    accessorKey: "line",
    header: "Modelo",
  },
  {
    accessorKey: "registrationNumber",
    header: "Numero de registro",
  },
];
