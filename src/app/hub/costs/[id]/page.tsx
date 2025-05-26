import { PageTitle } from "@/components/ui/page-title";
import { getCost } from "@/domains/costs/core/use-cases/getCost";

import { ICost } from "@/domains/costs/data/cost-columns";
import WCostsForm from "@/domains/costs/ui/wrappers/WCostForm";

interface IEditCostsPageProps {
  params: {
    id: string;
  };
}

export default async function EditCostsPage({ params }: IEditCostsPageProps) {
  const cost = (await getCost(params)).data || ({} as ICost);

  return (
    <div className="mt-6">
      <PageTitle>Editar centro de costos </PageTitle>
      <WCostsForm cost={cost} />
    </div>
  );
}
