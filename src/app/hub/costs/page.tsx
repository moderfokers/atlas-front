import React from "react";

import { Button } from "@/components/ui/button";

// import { WCostsTable } from "@/domains/costs/ui/wrappers/WCostsTable";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageTitle } from "@/components/ui/page-title";

import { WCostsTable } from "@/domains/costs/ui/wrappers/WCostTable";
import { getCosts } from "@/domains/costs/core/use-cases/getCosts";
import { WAddLink } from "@/domains/shared/auth/ui/wrappers/WAtlasLinks";

export default async function CostsPage() {
  const costs = (await getCosts()).data || [];

  return (
    <div className="flex-row">
      <PageTitle>Costos</PageTitle>
      <div className="mt-6">
        <WCostsTable costs={costs} />
        <WAddLink />
      </div>
    </div>
  );
}
