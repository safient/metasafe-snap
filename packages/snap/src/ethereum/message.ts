import { MessageStatus } from "@safient/snap-types";
import { SnapProvider } from "@metamask/snap-types";
import { MetamaskState } from "../interfaces";

export async function updateMessageInState(
  wallet: SnapProvider,
  message: MessageStatus
): Promise<void> {
  const state = (await wallet.request({
    method: "snap_manageState",
    params: ["get"],
  })) as MetamaskState;
  const index = state.ethereum.messages.findIndex(
    (msg) => msg.cid === message.cid
  );
  if (index >= 0) {
    state.ethereum.messages[index] = message;
  } else {
    state.ethereum.messages.push(message);
  }
  await wallet.request({
    method: "snap_manageState",
    params: ["update", state],
  });
}
