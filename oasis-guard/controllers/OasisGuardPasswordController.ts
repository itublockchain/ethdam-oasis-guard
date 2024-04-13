import { ethers, type ContractReceipt } from "ethers";

import { OasisGuardPasskeyController } from "~controllers/OasisGuardPasskeyController";
import { getFatSignature, sendGaslessTx } from "~utils";
import { AccountABI, Address } from "~web3";

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

        const receipt = await sendGaslessTx({
            abi: AccountABI,
            contractAddress: publicAddress,
            params: [
                Address.CONSTANT_VALIDATOR,
                signedHash,
                signature,
                ethers.utils.formatBytes32String(password),
                name,
            ],
            functionName: "addPassword",
        });
        return receipt;
    }

    static generateRandomPassword(): string {
        return Buffer.from(ethers.utils.randomBytes(32)).toString("hex");
    }
}
