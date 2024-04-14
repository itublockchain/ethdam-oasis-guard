import { ethers, type ContractReceipt } from "ethers";

import { OasisGuardPasskeyController } from "~controllers/OasisGuardPasskeyController";
import { getFatSignature, sendGaslessTx } from "~utils";
import { AccountABI, Address, getAccountContract } from "~web3";

export class OasisGuardPasswordController {
    static VALIDATOR = Address.CONSTANT_VALIDATOR;

    static async addPassword(
        credentialId: string,
        publicAddress: string,
        password: string,
        name: string,
    ): Promise<ContractReceipt> {
        const authResponse = await OasisGuardPasskeyController.auth([
            credentialId,
        ]);

        const signature = getFatSignature(authResponse);

        const signedHash = ethers.utils.sha256(
            Buffer.from(OasisGuardPasskeyController.CHALLENGE),
        );

        const formattedPassword = this.formatPassword(password);

        const receipt = await sendGaslessTx({
            abi: AccountABI,
            contractAddress: publicAddress,
            params: [
                this.VALIDATOR,
                signedHash,
                signature,
                formattedPassword,
                name,
            ],
            functionName: "addPassword",
        });
        return receipt;
    }

    static async addPasswords(
        credentialId: string,
        publicAddress: string,
        passwords: string[],
        names: string[],
    ): Promise<ContractReceipt> {
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
            params: [this.VALIDATOR, signedHash, signature, passwords, names],
            functionName: "addPasswords",
        });
        return receipt;
    }

    static async deletePassword(
        credentialId: string,
        publicAddress: string,
        name: string,
    ): Promise<ContractReceipt> {
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
            params: [this.VALIDATOR, signedHash, signature, name],
            functionName: "deletePassword",
        });
        return receipt;
    }

    static async genPassword(
        credentialId: string,
        publicAddress: string,
        name: string,
    ): Promise<string> {
        const authResponse = await OasisGuardPasskeyController.auth([
            credentialId,
        ]);
        const signature = getFatSignature(authResponse);
        const signedHash = ethers.utils.sha256(
            Buffer.from(OasisGuardPasskeyController.CHALLENGE),
        );

        const password = await getAccountContract(publicAddress).getPassword(
            this.VALIDATOR,
            signedHash,
            signature,
            name,
        );
        return password;
    }

    static generateRandomPassword(): string {
        return Buffer.from(ethers.utils.randomBytes(15)).toString("hex");
    }

    static formatPassword = (password: string): string => {
        return password;
        // const formattedPassword =
        //     password.length === 66 && password.startsWith("0x")
        //         ? password
        //         : ethers.utils.formatBytes32String(password);
        // return formattedPassword;
    };
}
