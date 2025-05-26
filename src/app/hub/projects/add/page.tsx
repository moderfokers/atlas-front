import { PageTitle } from "@/components/ui/page-title";
import { getClients } from "@/domains/clients/core/use-cases/getClients";
import WProjectForm from "@/domains/projects/ui/wrappers/WProjectForm";

export default async function AddProjectPage() {
  const clients = (await getClients()).data || [];
  return (
    <div className="mt-6">
      <PageTitle>Nuevo proyecto</PageTitle>
      <WProjectForm clients={clients} />
    </div>
  );
}
