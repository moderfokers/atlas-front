import {
  IActionsConfig,
  WDataTable,
} from "@/domains/shared/data-table/ui/wrappers/WDataTable";
import { costColumns, ICost } from "../../data/cost-columns";
import { deleteCost } from "../../core/use-cases/deleteCost.server";

interface IWCostsTablesProps {
  costs: ICost[];
}

const actionsConfig: IActionsConfig<ICost> = {
  delete: {
    action: deleteCost,
    onSuccess: {
      message: "Centro de costos eliminado satisfactoriamente",
    },
  },
  editLink: "/hub/costs/:id",
};

export const WCostsTable = ({ costs }: IWCostsTablesProps) => {
  return (
    <WDataTable
      columns={costColumns}
      data={costs}
      actionsConfig={actionsConfig}
    />
  );
};
