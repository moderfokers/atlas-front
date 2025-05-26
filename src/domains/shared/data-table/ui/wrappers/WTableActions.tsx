import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CellContext } from "@tanstack/react-table";
import { MoreHorizontal, X } from "lucide-react";
import { IActionsConfig } from "./WDataTable";
import { useCrudHandler } from "@/hooks/useCrudHandler";
import {
  WDeleteButton,
  WEditLink,
} from "@/domains/shared/auth/ui/wrappers/WAtlasLinks";

export interface IWTableActionsProps<TData>
  extends CellContext<TData, unknown> {
  actionsConfig: IActionsConfig<TData>;
}

export const WTableActions = <TData,>({
  row,
  actionsConfig,
}: IWTableActionsProps<TData>) => {
  const { delete: _delete } = useCrudHandler<TData>({
    delete: actionsConfig.delete,
  });

  const buildHref = (rowData: TData) => {
    return actionsConfig.editLink.replace(
      /:(\w+)/g,
      (_, key) => rowData[key] || `:${key}`
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuItem>
          <WEditLink
            href={buildHref(row.original)}
            className="flex inline-flex"
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <WDeleteButton
            onClick={() => _delete(row.original)}
            className="flex inline-flex"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
