"use client";

import { Button } from "@/components/ui/button";
import { WAuthLock } from "./WAuthLock";
import Link from "next/link";
import { FilePenLine, LucideProps, Plus, X } from "lucide-react";
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface IWLinkProps {
  className?: string;
  href?: string;
  onClick?: () => void;
}

export interface IModulePermission {
  href: string;
  permission: string;
}

export interface IModule {
  add: IModulePermission;
  delete: Omit<IModulePermission, "href">;
  edit: Omit<IModulePermission, "href">;
}

const MODULES = ["request", "client", "project", "cost", "user", "machine"];

const getModule = () => {
  if (window === undefined) return {};
  const url = window.location.pathname;
  const _module = MODULES.find((__module) => url.includes(__module));
  return _module;
};

const getModulePermissions = (): IModule => {
  const _module = getModule();
  if (!_module) return {} as IModule;

  return {
    add: {
      href: `/hub/${_module}s/add`,
      permission: `${_module}_add_event`,
    },
    edit: {
      permission: `${_module}_edit_event`,
    },
    delete: {
      permission: `${_module}_delete_event`,
    },
  };
};

export const WAddLink = ({ className }: IWLinkProps) => {
  const { add } = getModulePermissions();
  if (!add) return;
  const { permission, href } = add;

  return (
    <WAuthLock permission={permission}>
      <Link href={href || ""}>
        <Button className={className}>
          <Plus />
          Agregar
        </Button>
      </Link>
    </WAuthLock>
  );
};

export const WEditLink = ({ className, href }: IWLinkProps) => {
  const { edit } = getModulePermissions();
  const { permission } = edit;

  return (
    <WAuthLock permission={permission} className="text-slate-400">
      <Link href={href || ""} className={className}>
        <FilePenLine className="mt-[1px]" />

        <p className="ml-4">Editar</p>
      </Link>
    </WAuthLock>
  );
};

export const WDeleteButton = ({ className, onClick }: IWLinkProps) => {
  const { delete: _delete } = getModulePermissions();
  if (!_delete) return;
  const { permission } = _delete;

  return (
    <WAuthLock permission={permission}>
      <button
        className={cn(className, "bg-transparent text-black")}
        onClick={onClick}
      >
        <X className="mt-[1px]" />
        <p className="ml-4">Eliminar</p>
      </button>
    </WAuthLock>
  );
};
