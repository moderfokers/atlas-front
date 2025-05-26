import { PageTitle } from "@/components/ui/page-title";
import { getClients } from "@/domains/clients/core/use-cases/getClients";
// import { getProject } from "@/domains/projects/core/use-cases/getProject";

import { getProject } from "@/domains/projects/core/use-cases/getProject";
import { IProject } from "@/domains/projects/data/project-columns";
import WProjectForm from "@/domains/projects/ui/wrappers/WProjectForm";

interface IEditProjectPageProps {
  params: {
    id: string;
  };
}

export default async function EditProjectPage({
  params,
}: IEditProjectPageProps) {
  const project = (await getProject(params)).data || ({} as IProject);
  const clients = (await getClients()).data || [];

  return (
    <div className="mt-6">
      <PageTitle>Editar proyecto</PageTitle>
      <WProjectForm project={project} clients={clients} />
    </div>
  );
}
