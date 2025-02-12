import React from "react";

import { PageTitle } from "@/components/ui/page-title";
import { RequestStoreProvider } from "@/domains/requests/data/RequestProvider";
import { WRequestsList } from "@/domains/requests/ui/wrappers/WRequestsList";
import { WRequestsFilter } from "@/domains/requests/ui/wrappers/WRequestsFilter";
import { getRequestsView } from "@/domains/requests/core/use-cases/getRequestsView";
import { WAddLink } from "@/domains/shared/auth/ui/wrappers/WAtlasLinks";

export default async function RequestsPage() {
  const result = await getRequestsView();

  if (!result.data) return;

  const { requests, filters } = result.data;

  return (
    <div className="flex-row mt-6">
      <PageTitle>Solicitudes</PageTitle>
      <div className="mt-6">
        <RequestStoreProvider requests={requests}>
          <WRequestsFilter {...filters} className="mb-6" />
          <WRequestsList />
          <WAddLink />
        </RequestStoreProvider>
      </div>
    </div>
  );
}
