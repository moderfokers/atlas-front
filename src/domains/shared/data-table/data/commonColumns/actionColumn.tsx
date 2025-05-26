import { IActionsConfig } from "../../ui/wrappers/WDataTable";
import { WTableActions } from "../../ui/wrappers/WTableActions";

export const getActionColumn = <TData,>(
  actionsConfig: IActionsConfig<TData>
) => ({
  id: "actions",
  cell: (props) => <WTableActions {...props} actionsConfig={actionsConfig} />,
});
