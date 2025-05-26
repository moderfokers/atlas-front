"use client";

import React from "react";
import { useAuthStore } from "../../core/hooks/useAuthStore";
import { useShallow } from "zustand/shallow";
import { getJSONCookie } from "@/lib/utils";
import { IAuthOutput } from "../../core/use-cases/authenticate.server";

export const WUserInitializator = () => {
  const { userMetadata, setUserMetadata } = useAuthStore(
    useShallow(({ userMetadata, setUserMetadata }) => ({
      userMetadata,
      setUserMetadata,
    }))
  );

  React.useEffect(() => {
    if (!Object.entries(userMetadata).length) {
      const userCookie = getJSONCookie<IAuthOutput>("user_metadata");
      setUserMetadata(userCookie);
    }
  }, []);

  return <></>;
};
