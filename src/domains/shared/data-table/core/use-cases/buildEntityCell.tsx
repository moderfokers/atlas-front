import { CellContext } from "@tanstack/react-table";

export const buildEntityCell = <T,>(
  entityKey: string,
  key: string,
  { row }: CellContext<T, unknown>
) => {
  const entity = row.getValue(entityKey) as T;
  return <div className="font-medium">{entity[`${key}`]}</div>;
};
