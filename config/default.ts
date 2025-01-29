import { IAtlasConfig } from "types/config";

export const config: IAtlasConfig = {
  accessTokenKey: "access_token",
  authHeader: "x-Authorization",
  fetchConfig: {
    // baseUrl: "http://192.168.2.13:8080",
    // baseUrl: "http://192.168.2.13:8080",
    baseUrl:
      "https://ciam-server-dev-deh8g4f6gpb0fmcp.eastus-01.azurewebsites.net",
    cache: "no-store",
    // baseUrl: "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
      // Accept: "*/*",
    },
    // signal: AbortSignal.abort(2000),
  },
};
