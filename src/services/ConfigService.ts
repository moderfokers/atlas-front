import { IAtlasConfig, IAtlasService } from "types/config";

import { config as configDefault } from "config/default";
import { config as configLocal } from "config/local";
import { config as configMock } from "config/mock";
import { deepMerge } from "@/lib/utils";

type ConfigKeys = "default" | "local" | "mock"; // Define the allowed keys

const env = process.env.NODE_ENV as ConfigKeys;
// const DEFAULT_CONFIG_NAME = "default";

class ConfigServiceClass implements IAtlasService<IAtlasConfig> {
  public async load(customConfig?: Partial<IAtlasConfig>) {
    await this.setConfig(customConfig);
  }

  public getInstance() {
    return global.___ATLAS_CONFIG___;
  }

  private async setConfig(customConfig?: Partial<IAtlasConfig>) {
    try {
      const configModules = {
        default: configDefault,
        local: configLocal,
        mock: configMock,
      };

      const config = configModules[`${env}`];
      const defaultConfig = configModules.default;

      global.___ATLAS_CONFIG___ =
        deepMerge(defaultConfig, config, customConfig || {}) || defaultConfig;
    } catch (error) {
      console.log("CONFIG_SERVICE", "Could read config");
      console.log(error);
    }
  }

  getConfig() {
    try {
      const configModules = {
        default: configDefault,
        local: configLocal,
        mock: configMock,
      };

      const config = configModules[`${env}`];
      const defaultConfig = configModules.default;

      return deepMerge(defaultConfig, config) || defaultConfig;
    } catch (error) {
      console.log("CONFIG_SERVICE", "Could read config");
      console.log(error);
      return {} as IAtlasConfig;
    }
  }
}

const ConfigService = new ConfigServiceClass();
export { ConfigService };
