import {
  MessageStatus,
  MetamaskFilecoinRpcRequest,
  SnapConfig,
} from "@safient/metasafe-types";
import { defaultConfiguration } from "./configuration/predefined";

export type FMethodCallback = (
  originString: string,
  requestObject: MetamaskFilecoinRpcRequest
) => Promise<unknown>;

export type MetamaskState = {
  ethereum: {
    config: SnapConfig;
    messages: MessageStatus[];
  };
};

export const EmptyMetamaskState: () => MetamaskState = () => ({
  ethereum: { config: defaultConfiguration, messages: [] },
});
