"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { NAVIGATION_MAP } from "../../data/navigation";
import React from "react";
import Image from "next/image";
import AtlasPowered from "../../../../../../public/logo_v1.png";
import { UserMenu } from "./Footer";
import { IAuthOutput } from "@/domains/shared/auth/core/use-cases/authenticate.server";
import { cn } from "@/lib/utils";

export const MenuBread = ({ userMetadata }: { userMetadata: IAuthOutput }) => {
  const headerRef = React.useRef(null);
  const headerRef2 = React.useRef(null);
  const pathname = usePathname();
  // const userMetadata = AuthService.getUserMetadata();
  const breads = NAVIGATION_MAP.filter(({ url }) => {
    const pathFragments = pathname.split("/");
    const urlFragments = url.split("/");

    const realUrl = urlFragments
      .map((fragment, index) =>
        Boolean(Number(pathFragments[index]))
          ? fragment.replace("*", pathFragments[index] || "*")
          : fragment
      )
      .join("/");

    return pathname.includes(realUrl);
  });

  const handleScroll = () => {
    console.log(window.scrollY);

    const stickyHeader = window.scrollY > 56;
    (headerRef.current as unknown as HTMLElement).style.position = stickyHeader
      ? "fixed"
      : "relative";
    (headerRef2.current as unknown as HTMLElement).style.display = stickyHeader
      ? "flex"
      : "none";
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div
        className={cn(
          "flex bg-[#0D2E56] w-full justify-between text-white h-14 px-4 py-2"
          // fixedHeader && "mb-[56px]"
        )}
      >
        <Image
          alt="Atlas logo"
          src={AtlasPowered}
          width={0}
          height={0}
          className="w-[80px]"
        />

        <UserMenu userMetadata={userMetadata} />
      </div>
      <div ref={headerRef2} className="bg-primary w-full hidden h-[36px]" />

      <div
        ref={headerRef}
        className={cn("flex bg-primary w-full text-white p-2 top-0 z-10")}
      >
        <SidebarTrigger className="mr-3 hover:bg-primary/80 hover:text-white/80" />
        <Breadcrumb>
          <BreadcrumbList>
            {breads.map((bread, index) => (
              <React.Fragment key={`br_${bread.title}`}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={bread.url} className="text-white">
                    {bread.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index !== breads.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};
