import { ethers, type ContractReceipt } from "ethers";

import { OasisGuardPasskeyController } from "~controllers/OasisGuardPasskeyController";
import { getFatSignature } from "~utils";
import {
    AccountABI,
    Address,
    getGaslessProxyContract,
    SAPPHIRE_PROVIDER,
} from "~web3";

export class OasisGuardPasswordController {
    static async addPassword(
        credentialId: string,
        publicAddress: string,
        password: string,
        name: string,
    ): Promise<ContractReceipt> {
        const accountIFace = new ethers.utils.Interface(AccountABI);
        const authResponse = await OasisGuardPasskeyController.auth([
            credentialId,
        ]);

        const signature = getFatSignature(authResponse);

        const signedHash = ethers.utils.sha256(
            Buffer.from(OasisGuardPasskeyController.CHALLENGE),
        );

        const calldata = accountIFace.encodeFunctionData("addPassword", [
            Address.VALIDATOR,
            signedHash,
            signature,
            ethers.utils.formatBytes32String(password),
            name,
        ]);

        const addPasswordMetaTx = await getGaslessProxyContract().makeProxyTx(
            publicAddress,
            calldata,
            500_000,
        );

        const tx = await SAPPHIRE_PROVIDER.sendTransaction(addPasswordMetaTx);
        const receipt = await tx.wait();
        return receipt;
    }
}
