import { PageTitle } from "@/components/ui/page-title";
import { getClient } from "@/domains/clients/core/use-cases/getClient";
import WClientForm, { IClient } from "@/domains/clients/ui/wrappers/WClientForm";

interface IEditClientPageProps {
  params: {
    id: string;
  };
}

export default async function EditClientPage({ params }: IEditClientPageProps) {
  const client = (await getClient(params)).data || ({} as IClient);

  return (
    <div className="mt-6">
      <PageTitle>Editar cliente</PageTitle>
      <WClientForm client={client} />
    </div>
  );
}
