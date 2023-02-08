import {
  MetamaskFilecoinRpcRequest,
} from "@safient/snap-types";
import { MetamaskSafientSnap } from "./snap";

async function sendSnapMethod<T>(
  request: MetamaskFilecoinRpcRequest,
  snapId: string
): Promise<T> {
  return await window.ethereum.request({
    method: snapId,
    params: [request],
  });
}


export async function getAddress(this: MetamaskSafientSnap): Promise<string> {

  const accounts: any = await window.ethereum.request({ method: 'eth_requestAccounts' });  
  return accounts[0];
}

export async function exportPrivateKey(
  this: MetamaskSafientSnap
): Promise<string> {
  const accounts: any = await window.ethereum.request({ method: 'eth_requestAccounts' });
  return await sendSnapMethod({ method: "fil_exportPrivateKey", params: { address: accounts[0]} }, this.snapId);
}

