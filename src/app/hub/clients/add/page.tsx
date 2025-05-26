import { PageTitle } from "@/components/ui/page-title";
import WClientForm from "@/domains/clients/ui/wrappers/WClientForm";

export default function AddClientPage() {
  return (
    <div className="mt-6">
      <PageTitle>Nuevo cliente</PageTitle>
      <WClientForm />
    </div>
  );
}
