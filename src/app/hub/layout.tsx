import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";

import { WHeader } from "@/domains/shared/menu/ui/wrappers/WHeader";
import { WMenu } from "@/domains/shared/menu/ui/wrappers/WMenu";
import { WFooter } from "@/domains/shared/menu/ui/wrappers/WFooter";

import { MenuBread } from "@/domains/shared/menu/ui/components/MenuBread";
import { WUserInitializator } from "@/domains/shared/auth/ui/wrappers/WUserInitializator";
import { Separator } from "@radix-ui/react-select";
import { AuthService } from "@/services/AuthService";

export default function HubLayout({ children }: { children: React.ReactNode }) {
  const userMetadata = AuthService.getUserMetadata();
  return (
    <SidebarProvider>
      <WUserInitializator />
      <Sidebar>
        {/* <WHeader /> */}

        <WMenu />
        {/* <WFooter /> */}
      </Sidebar>
      <div className="flex-flex-col w-full">
        <MenuBread userMetadata={userMetadata} />
        <main className="h-screen w-full p-4 md:px-6 bg-gray-50  ">{children}</main>
      </div>
    </SidebarProvider>
  );
}
