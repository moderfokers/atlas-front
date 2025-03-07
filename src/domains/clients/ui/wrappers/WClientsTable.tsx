import {
  IActionsConfig,
  WDataTable,
} from "@/domains/shared/data-table/ui/wrappers/WDataTable";
import { clientColumns } from "@/domains/clients/data/client-columns";
import { deleteClient } from "../../core/use-cases/deleteClient.server";
import { IClient } from "./WClientForm";

interface IWClientTablesProps {
  clients: IClient[];
}
const actionsConfig: IActionsConfig<IClient> = {
  delete: {
    action: deleteClient,
    onSuccess: {
      message: "Cliente eliminado satisfactoriamente",
    },
  },
  editLink: "/hub/clients/:id",
};

export const WClientsTable = ({ clients }: IWClientTablesProps) => {
  return (
    <WDataTable
      columns={clientColumns}
      data={clients}
      actionsConfig={actionsConfig}
    />
  );
};
