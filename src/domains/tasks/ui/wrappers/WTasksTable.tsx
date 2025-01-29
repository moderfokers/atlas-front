import {
  IActionsConfig,
  WDataTable,
} from "@/domains/shared/data-table/ui/wrappers/WDataTable";
import { taskColumns } from "@/domains/tasks/data/task-columns";
import { deleteTask } from "../../core/use-cases/deleteTask.server";
import { ITask } from "@/domains/requests/ui/wrappers/WTaskForm";


interface IWTaskTablesProps {
  tasks: ITask[];
}
const actionsConfig: IActionsConfig<ITask> = {
  delete: {
    action: deleteTask,
    onSuccess: {
      message: "Taske eliminado satisfactoriamente",
    },
  },
  editLink: "/hub/task/:id",
};

export const WTasksTable = ({ tasks }: IWTaskTablesProps) => {
  return (
    <WDataTable
      columns={taskColumns}
      data={tasks}
      actionsConfig={actionsConfig}
    />
  );
};
