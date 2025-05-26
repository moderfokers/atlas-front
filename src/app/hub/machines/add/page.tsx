import { PageTitle } from "@/components/ui/page-title";
import { getMachineAddView } from "@/domains/machines/core/use-cases/getMachineAddView";
import WMachineForm from "@/domains/machines/ui/wrappers/WMachineForm";

export default async function AddMachinePage() {
  const { data } = await getMachineAddView();
  if (!data) return;

  return (
    <div className="mt-6">
      <PageTitle>Nueva maquina</PageTitle>
      <WMachineForm {...data} />
    </div>
  );
}
