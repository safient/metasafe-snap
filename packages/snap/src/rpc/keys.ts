import { SnapProvider } from "@metamask/snap-types";
import { getKeyPair } from "../ethereum/account";
import { showConfirmationDialog } from "../util/confirmation";

export async function exportPrivateKey(
  wallet: SnapProvider, 
  params: any
): Promise<string | null> {

  // if (params != null &&
  //     typeof params == "object" &&
  //     "address" in params) {

  //       params.address

  //     }

  // ask for confirmation
  const confirmation = await showConfirmationDialog(wallet, {
    prompt: "Create a recovery for your private key?"
  });
  // return private key if user confirmed action
  if (confirmation) {
    const keypair = await getKeyPair(wallet, params.address );
    return keypair.privateKey;
  }
  return null;
}

export async function getAddress(wallet: SnapProvider): Promise<string> {
  // const keyPair = await getKeyPair(wallet, 'sd');
  return 'sd';
}

