import { ethers } from "ethers";
// import { base64 } from "ethers/lib/utils";

export function create_wallet(sk: string): ethers.Wallet {
    return new ethers.Wallet(sk);
}

export async function sign_response(wallet: ethers.Wallet, response: Response): Promise<string> {
    const signed_msg = wallet.signMessage(JSON.stringify(response));
    return signed_msg;
}