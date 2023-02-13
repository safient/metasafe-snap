import { SafientSnapApi } from "@safient/metasafe-types";
import {
  exportPrivateKey,
  getAddress,
} from "./methods";

export class MetamaskSafientSnap {
  // snap parameters
  protected readonly snapOrigin: string;
  protected readonly snapId: string;

  public constructor(snapOrigin: string) {
    this.snapOrigin = snapOrigin;
    this.snapId = `wallet_snap_${this.snapOrigin}`;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public getFilecoinSnapApi = async (): Promise<SafientSnapApi> => {
    return {
      exportPrivateKey: exportPrivateKey.bind(this),
      getAddress: getAddress.bind(this)
    };
  };
}
