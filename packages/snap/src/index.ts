import { OnRpcRequestHandler } from "@metamask/snap-types";
import { EmptyMetamaskState } from "./interfaces";
import { exportPrivateKey, getAddress } from "./rpc/keys";


export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  const state = await wallet.request({
    method: "snap_manageState",
    params: ["get"],
  });

  if (!state) {
    // initialize state if empty and set default config
    await wallet.request({
      method: "snap_manageState",
      params: ["update", EmptyMetamaskState()],
    });
  }

  // initialize lotus RPC api if needed

  switch (request.method) {
    
    case "fil_getAddress":
      return await getAddress(wallet);
    case "fil_exportPrivateKey":
      return exportPrivateKey(wallet, request.params);
    default:
      throw new Error("Unsupported RPC method");
  }
};
