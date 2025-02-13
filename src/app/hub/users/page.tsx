import React from "react";

import { WUsersTable } from "@/domains/users/ui/wrappers/WUsersTable";
import { PageTitle } from "@/components/ui/page-title";
import { getUsers } from "@/domains/users/core/use-cases/getUsers";
import { WAddLink } from "@/domains/shared/auth/ui/wrappers/WAtlasLinks";

export default async function UsersPage() {
  const users = (await getUsers()).data || [];

  return (
    <div className="flex-row">
      <PageTitle>Usuarios</PageTitle>
      <div className="mt-6">
        <WUsersTable users={users} />
        <WAddLink />
      </div>
    </div>
  );
}
