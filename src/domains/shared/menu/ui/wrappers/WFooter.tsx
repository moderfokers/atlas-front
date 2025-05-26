import React from "react";

import { AuthService } from "@/services/AuthService";
import { MenuFooter } from "../components/Footer";

export const WFooter = () => {
  const userMetadata = AuthService.getUserMetadata();

  return <MenuFooter userMetadata={userMetadata} />;
};
