import { PageTitle } from "@/components/ui/page-title";
import WCostsForm from "@/domains/costs/ui/wrappers/WCostForm";


export default function AddCostPage() {
  return (
    <div className="mt-6">
      <PageTitle>Nuevo centro de costos</PageTitle>
      <WCostsForm />
    </div>
  );
}
