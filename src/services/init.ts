import { ConfigService } from "./ConfigService";
// import { RequestService } from "./RequestService";
// import { init as initMocks } from "./MockService";

export const init = async () => {
  // initMocks();
  // global.___ATLAS_CONFIG___ = {};
  // global.___ATLAS_CONFIG___ = {};

  await ConfigService.load();
  // await RequestService.load();
};
