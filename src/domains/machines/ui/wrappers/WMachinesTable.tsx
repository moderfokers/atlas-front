import {
  IActionsConfig,
  WDataTable,
} from "@/domains/shared/data-table/ui/wrappers/WDataTable";
import { machineColumns } from "@/domains/machines/data/machine-columns";
import { deleteMachine } from "../../core/use-cases/deleteMachine.server";
import { IMachine } from "../../data/machine-entities";

interface IWMachineTablesProps {
  machines: IMachine[];
}
const actionsConfig: IActionsConfig<IMachine> = {
  delete: {
    action: deleteMachine,
    onSuccess: {
      message: "Maquina eliminado satisfactoriamente",
    },
  },
  editLink: "/hub/machines/:id",
};

export const WMachinesTable = ({ machines }: IWMachineTablesProps) => {
  return (
    <WDataTable
      columns={machineColumns}
      data={machines}
      actionsConfig={actionsConfig}
    />
  );
};
