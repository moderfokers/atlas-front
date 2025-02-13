"use client";

import React from "react";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  ChevronUp,
  LifeBuoy,
  LogOut,
  Settings,
  User,
  User2,
  UserRoundCog,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IAuthOutput } from "@/domains/shared/auth/core/use-cases/authenticate.server";
import { logout } from "@/domains/shared/auth/core/use-cases/logout.server";
import { Button } from "@/components/ui/button";

export interface IMenuFooterProps {
  userMetadata: IAuthOutput;
}

export const UserMenu = ({ userMetadata }: IMenuFooterProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className="flex items-center" size={"icon"}>
        <UserRoundCog />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem disabled>
          <User className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>

        <DropdownMenuItem disabled>
          <Settings className="mr-2 h-4 w-4" />
          <span>Configuración</span>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />

      <DropdownMenuItem disabled>
        <LifeBuoy className="mr-2 h-4 w-4" />
        <span>Soporte</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => logout()}>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Cerrar sesión</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const MenuFooter = ({ userMetadata }: IMenuFooterProps) => {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <UserMenu userMetadata={userMetadata} />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};
