/* eslint-disable no-var */
import { IAtlasConfig, IAtlasInstances } from "./config";

declare global {
  namespace globalThis {
    var ___ATLAS_CONFIG___: IAtlasConfig = {};
    var ___ATLAS_INSTANCES___: IAtlasInstances = {};
  }
}
