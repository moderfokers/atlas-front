"use client";

import { IRequestStatus } from "./WRequestForm";
import { IProject } from "@/domains/projects/data/project-columns";
import { IMachineClass } from "@/domains/machines/data/machine-entities";
import { FilterSelect } from "../components/FilterSelect";
import { useRequestStore } from "../../core/hooks/useRequestStore";
import { useShallow } from "zustand/shallow";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";
import React from "react";

export interface IWRequestFilters {
  statuses: IRequestStatus[];
  projects: IProject[];
  machineClasses: IMachineClass[];
  className?: string;
}

export interface IRequestFilter {
  status: IRequestStatus;
  project: IProject;
  machineClass: IMachineClass;
}

export const WRequestsFilter = ({
  statuses,
  projects,
  machineClasses,
  className,
}: IWRequestFilters) => {
  const [setFilters, filters] = useRequestStore(
    useShallow((state) => [state.setFilters, state.filters])
  );

  const noFilters = React.useMemo(
    () => !Object.keys(filters).length,
    [filters]
  );

  const statusChangeHandler = (value?: IRequestStatus) =>
    setFilters({
      status: value,
    });

  const projectsChangeHandler = (value?: IProject) =>
    setFilters({
      project: value,
    });

  const machineClassChangeHandler = (value?: IMachineClass) =>
    setFilters({
      machineClass: value,
    });

  const onClearHandler = () => {
    setFilters({}, true);
  };

  return (
    <div className={cn("flex flex-col md:flex-row", className)}>
      <FilterSelect<IRequestStatus>
        label="Estado"
        options={statuses}
        onChange={statusChangeHandler}
        className="mb-2 md:mr-4"
        value={filters.status?.id}
      />
      <FilterSelect<IProject>
        label="Proyecto"
        options={projects}
        valueKey="contractNumber"
        onChange={projectsChangeHandler}
        className="mb-2 md:mr-4"
        value={filters.project?.id}
      />
      <FilterSelect<IMachineClass>
        className="mb-2 md:mr-4"
        label="Tipo de maquina"
        options={machineClasses}
        onChange={machineClassChangeHandler}
        value={filters.machineClass?.id}
      />
      <div className="flex items-end">
        <Button
          variant="outline"
          size="sm"
          disabled={noFilters}
          onClick={onClearHandler}
        >
          <Eraser />
        </Button>
      </div>
    </div>
  );
};
