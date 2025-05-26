"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IClient } from "../ui/wrappers/WClientForm";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const clientColumns: ColumnDef<IClient>[] = [
  {
    accessorKey: "nit",
    header: "NIT",
  },
  {
    accessorKey: "name",
    header: "Cliente empresa",
  },
];
