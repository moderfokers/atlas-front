import React from "react";

import { WTasksTable } from "@/domains/tasks/ui/wrappers/WTasksTable";
import { PageTitle } from "@/components/ui/page-title";
import { getTasks } from "@/domains/tasks/core/use-cases/getTasks";
import { WAddLink } from "@/domains/shared/auth/ui/wrappers/WAtlasLinks";

export default async function TasksPage() {
  const tasks = (await getTasks()).data || [];

  return (
    <div className="flex-row mt-6">
      <PageTitle>Taskes</PageTitle>
      <div className="mt-6">
        <WTasksTable tasks={tasks} />
        <WAddLink />
      </div>
    </div>
  );
}
