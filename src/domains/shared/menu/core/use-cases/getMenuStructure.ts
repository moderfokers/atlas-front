import { IAuthOutput } from "@/domains/shared/auth/core/use-cases/authenticate.server";
import { IMenuItem, MENU_TREE } from "../../data/menu";

export const getMeuStructure = (userMetadata: IAuthOutput) => {
  if (!userMetadata) return [] as IMenuItem[];

  return MENU_TREE.filter(({ permissionId }) =>
    userMetadata.permissions.some((permission) => permissionId === permission)
  );
};
