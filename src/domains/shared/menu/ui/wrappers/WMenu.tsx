import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getMeuStructure } from "../../core/use-cases/getMenuStructure";

import { AuthService } from "@/services/AuthService";
import { Separator } from "@/components/ui/separator";

export const WMenu = async () => {
  const userMetadata = AuthService.getUserMetadata();
  const menuStructure = await getMeuStructure(userMetadata);

  return (
    <SidebarContent className="bg-primary text-white/90 border-0">
      <SidebarGroup className="p-0">
        <SidebarGroupLabel className="text-white/60 m-0 bg-[#0D2E56] text-center items-start italic h-14 flex flex-col justify-center">
          <p>
            Bienvenido <b>{userMetadata.user.email}</b>
          </p>
          <p>Rol ➜ {userMetadata.role.name}</p>
        </SidebarGroupLabel>
        <Separator className="bg-[#0D2E56]/50" />

        <SidebarGroupContent>
          <SidebarMenu>
            {menuStructure.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  asChild
                  className="p-4 hover:bg-[#0D2E56] hover:text-white"
                >
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};
