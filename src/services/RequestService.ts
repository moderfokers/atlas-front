import { ConfigService } from "./ConfigService";
import { cookies } from "next/headers";
import { deepMerge } from "@/lib/utils";
import axios, { AxiosRequestConfig } from "axios";
import { AtlasFetchConfig } from "types/config";

export interface IGenericRequestError {
  status: number;
  error: unknown;
  code: string;
}

export interface IFetchResponse<ResponseType> {
  status: number;
  error?: string;
  data?: ResponseType;
}

const transformAtlasFetchConfigToAxios = (
  fetchConfig: AtlasFetchConfig
): AxiosRequestConfig<any> => {
  return {
    baseURL: fetchConfig.baseUrl,
    ...(fetchConfig as Partial<AxiosRequestConfig<any>>),
  };
};

class RequestServiceClass {
  private buildAccessTokenHeader() {
    const config = ConfigService.getConfig();
    const accessToken = cookies().get(config.accessTokenKey);

    if (!accessToken) return {};

    return {
      headers: {
        [config.authHeader || "X-Auth"]: `Bearer ${accessToken.value}`,
      },
    };
  }

  public async fetch<ResponseType>(
    input: string | URL | globalThis.Request,
    init?: RequestInit
  ): Promise<IFetchResponse<ResponseType>> {
    const config = ConfigService.getConfig();

    const fetchConfig = deepMerge(
      this.buildAccessTokenHeader(),
      { ...config.fetchConfig },
      { ...init }
    );

    const fullPath = `${config.fetchConfig.baseUrl}${input}`;

    try {
      const response = await fetch(fullPath, fetchConfig);
      if (!response.ok) {
        return {
          status: response.status,
          error: response.statusText,
        };
      }
      const { data } = (await response.json()) as { data: ResponseType };
      return {
        status: response.status,
        data,
      };
    } catch (error) {
      console.log(error);

      return {
        status: 500,
        error: (error as string) || "GENERIC_ERROR",
      };
    }
  }

  public async axios<ResponseType>(
    input: string,
    axiosConfig?: AxiosRequestConfig<any>
  ): Promise<IFetchResponse<ResponseType>> {
    const config = ConfigService.getConfig();

    const fetchConfig = {
      ...config.fetchConfig,
      ...this.buildAccessTokenHeader(),
      ...axiosConfig,
    };

    const fullPath = `${config.fetchConfig.baseUrl}${input}`;

    try {
      const response = await axios(
        fullPath,
        transformAtlasFetchConfigToAxios({ ...fetchConfig })
      );
      const isOk = response.status >= 200 && response.status < 300;
      if (!isOk) {
        return {
          status: response.status,
          error: response.statusText,
        };
      }
      const { data } = response as { data: ResponseType };
      return {
        status: response.status,
        data,
      };
    } catch (error) {
      console.log(error);

      return {
        status: 500,
        error: (error as string) || "GENERIC_ERROR",
      };
    }
  }
}

const RequestService = new RequestServiceClass();
export { RequestService };
