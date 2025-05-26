import {
  IActionsConfig,
  WDataTable,
} from "@/domains/shared/data-table/ui/wrappers/WDataTable";
import { userColumns } from "@/domains/users/data/user-columns";
import { deleteUser } from "../../core/use-cases/deleteUser.server";
import { IUser } from "../../data/user-entites";

interface IWUserTablesProps {
  users: IUser[];
}
const actionsConfig: IActionsConfig<IUser> = {
  delete: {
    action: deleteUser,
    onSuccess: {
      message: "Usere eliminado satisfactoriamente",
    },
  },
  editLink: "/hub/users/:id",
};

export const WUsersTable = ({ users }: IWUserTablesProps) => {
  return (
    <WDataTable
      columns={userColumns}
      data={users}
      actionsConfig={actionsConfig}
    />
  );
};
