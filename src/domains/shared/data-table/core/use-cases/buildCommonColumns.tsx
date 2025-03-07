import { ColumnDef } from "@tanstack/react-table";
import { IActionsConfig } from "../../ui/wrappers/WDataTable";

import { getActionColumn } from "../../data/commonColumns/actionColumn";
import { getSelectColumn } from "../../data/commonColumns/selectColumn";

export const buildCommonColumns = <TData, TValue>(
  columns: ColumnDef<TData, TValue>[],
  actionsConfig: IActionsConfig<TData>
) => {
  // const firstColumns: ColumnDef<TData, TValue>[] = [getSelectColumn()];
  const firstColumns: ColumnDef<TData, TValue>[] = [];

  const lastColumns: ColumnDef<TData, TValue>[] = [
    getActionColumn(actionsConfig),
  ];
  return [...firstColumns, ...columns, ...lastColumns];
};
