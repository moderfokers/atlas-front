import { PageTitle } from "@/components/ui/page-title";
import { getMachineEditView } from "@/domains/machines/core/use-cases/getMachineEditView";
import WMachineForm from "@/domains/machines/ui/wrappers/WMachineForm";

interface IEditMachinePageProps {
  params: {
    id: number;
  };
}

export default async function EditMachinePage({
  params,
}: IEditMachinePageProps) {
  const result = await getMachineEditView({ id: params.id });
  if (!result.data) return;

  return (
    <div className="mt-6">
      <PageTitle>Editar maquina</PageTitle>
      <WMachineForm {...result.data} />
    </div>
  );
}
