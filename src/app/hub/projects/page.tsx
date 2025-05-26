import React from "react";

import { Button } from "@/components/ui/button";

import { WProjectsTable } from "@/domains/projects/ui/wrappers/WProjectsTable";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageTitle } from "@/components/ui/page-title";
import { getProjects } from "@/domains/projects/core/use-cases/getProjects";
import { WAddLink } from "@/domains/shared/auth/ui/wrappers/WAtlasLinks";

export default async function ProjectsPage() {
  const projects = (await getProjects()).data || [];

  return (
    <div className="flex-row">
      <PageTitle>Proyectos</PageTitle>
      <div className="mt-6">
        <WProjectsTable projects={projects} />
        <WAddLink />
      </div>
    </div>
  );
}
