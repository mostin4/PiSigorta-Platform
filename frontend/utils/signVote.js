import { signMessage } from 'pi-wallet-sdk'; // varsayımsal SDK

export async function signVoteMessage(message, walletAddress) {
  const signature = await signMessage(walletAddress, message);
  return signature;
}
