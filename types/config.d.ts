import { IUser } from "@/domains/login/core/use-cases/authenticate.server";

export interface AtlasFetchConfig extends RequestInit {
  baseUrl: string;
}

export interface IAtlasConfig {
  fetchConfig: AtlasFetchConfig;
  accessTokenKey: string;
  authHeader: string;
  user?: IUser;
}


export interface IAtlasService<T = null, U = void> {
  load: (args: T) => Promise<void>;
  getInstance: () => U;
}

export type TIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;
