import { SidebarHeader } from "@/components/ui/sidebar";
import Image from "next/image";
import AtlasPowered from "../../../../../../public/logo_v1.png";
import AtlasOut from "../../../../../../public/atlas-out.png";

export const WHeader = () => {
  return (
    <SidebarHeader className="bg-[#0D2E56] px-4 py-2 flex flex-row items-center justify-between">
      <Image
        alt="Atlas logo"
        src={AtlasPowered}
        width={70}
        height={0}
        className="cursor-pointer"
      />

      {/* <Image
        alt="Atlas logo"
        src={AtlasOut}
        width={150}
        height={0}
        className="cursor-pointer"
      /> */}
    </SidebarHeader>
  );
};
