import React from "react";

import { WClientsTable } from "@/domains/clients/ui/wrappers/WClientsTable";
import { PageTitle } from "@/components/ui/page-title";
import { getClients } from "@/domains/clients/core/use-cases/getClients";
import { WAddLink } from "@/domains/shared/auth/ui/wrappers/WAtlasLinks";

export default async function ClientsPage() {
  const clients = (await getClients()).data || [];

  return (
    <div className="flex-row">
      <PageTitle>Clientes</PageTitle>
      <div className="mt-6">
        <WClientsTable clients={clients} />
        <WAddLink />
      </div>
    </div>
  );
}
