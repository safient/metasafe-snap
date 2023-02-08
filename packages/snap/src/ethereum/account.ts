import { keyRecover } from "@zondax/filecoin-signing-tools/js";
import { KeyPair } from "@safient/snap-types";
import {
  getBIP44AddressKeyDeriver,
  JsonBIP44CoinTypeNode,
} from "@metamask/key-tree";
import { SnapProvider } from "@metamask/snap-types";
import { getMetamaskVersion, isNewerVersion } from "../util/version";
import { MetamaskState } from "../interfaces";

/**
 * Return derived KeyPair from seed.
 * @param wallet
 */
export async function getKeyPair(wallet: SnapProvider, address: string): Promise<KeyPair> {
  const snapState = (await wallet.request({
    method: "snap_manageState",
    params: ["get"],
  })) as MetamaskState;
  const { derivationPath } = snapState.ethereum.config;
  const [, , coinType, account, change, addressIndex] =
    derivationPath.split("/");
  const bip44Code = coinType.replace("'", "");
  const isEthereumMainnet = bip44Code === "60";

  let bip44Node: JsonBIP44CoinTypeNode;
  const currentVersion = await getMetamaskVersion(wallet);
  if (isNewerVersion("MetaMask/v10.18.99-flask.0", currentVersion))
    bip44Node = (await wallet.request({
      method: "snap_getBip44Entropy",
      params: {
        coinType: 60,
      },
    })) as JsonBIP44CoinTypeNode;
  else
    bip44Node = (await wallet.request({
      method: `snap_getBip44Entropy_${60}`,
      params: [],
    })) as JsonBIP44CoinTypeNode;

  const addressKeyDeriver = await getBIP44AddressKeyDeriver(bip44Node, {
    account: parseInt(account),
    change: parseInt(change),
  });
  // const extendedPrivateKey = await addressKeyDeriver(Number(addressIndex));
  

  let extendedPrivateKey;
  let Iindex = 0;
  do {

    extendedPrivateKey = await addressKeyDeriver(Number(Iindex));
    Iindex = Iindex + 1
  }
  while(address != extendedPrivateKey.address);

  const privateKey = extendedPrivateKey.privateKeyBuffer.slice(0, 32);

  const extendedKey = keyRecover(privateKey, !isEthereumMainnet);

  return {
    address: extendedPrivateKey.address,
    privateKey: extendedKey.private_hexstring,
    publicKey: extendedKey.public_hexstring,
  };
}


  // let addressIndex = 0;
  // let extendedPrivateKey;
  // do {
  //  extendedPrivateKey = await addressKeyDeriver(Number(addressIndex));
  //  addressIndex = addressIndex + 1
  // }
  // while(extendedPrivateKey.address != address);