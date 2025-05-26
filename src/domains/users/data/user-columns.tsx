"use client";

import { ColumnDef } from "@tanstack/react-table";

import { buildEntityCell } from "@/domains/shared/data-table/core/use-cases/buildEntityCell";
import { IUser } from "./user-entites";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const userColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "email",
    header: "Correo",
  },

  {
    accessorKey: "lastName",
    header: "Apellido",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },

  {
    accessorKey: "cedula",
    header: "Cédula",
  },

  {
    accessorKey: "role",
    header: "Role",
    cell: (props) => buildEntityCell<IUser>("role", "name", props),
  },
];
