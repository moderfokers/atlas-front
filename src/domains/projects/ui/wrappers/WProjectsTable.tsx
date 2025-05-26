import {
  IActionsConfig,
  WDataTable,
} from "@/domains/shared/data-table/ui/wrappers/WDataTable";
import {
  projectColumns,
  IProject,
} from "@/domains/projects/data/project-columns";
import { deleteProject } from "../../core/use-cases/deleteProject.server";

interface IWProjectTablesProps {
  projects: IProject[];
}

const actionsConfig: IActionsConfig<IProject> = {
  delete: {
    action: deleteProject,
    onSuccess: {
      message: "Proyecto eliminado satisfactoriamente",
    },
  },
  editLink: "/hub/projects/:id",
};

export const WProjectsTable = ({ projects }: IWProjectTablesProps) => {
  return (
    <WDataTable
      columns={projectColumns}
      data={projects}
      actionsConfig={actionsConfig}
    />
  );
};
