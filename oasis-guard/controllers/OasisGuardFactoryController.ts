import { Identity } from "@semaphore-protocol/identity";
import { ethers, type ContractReceipt } from "ethers";

import { formatHex, sendGaslessTx } from "~utils";
import { AccountFactoryABI, Address, getFactoryContract } from "~web3";

export class OasisGuardFactoryController {
    static async genCreateAccount(
        publicKey: [string, string],
        userId: string,
    ): Promise<ContractReceipt> {
        const { privateKey: semaphoreIdentityPK } = new Identity();

        const receipt = await sendGaslessTx({
            contractAddress: Address.FACTORY,
            abi: AccountFactoryABI,
            params: [publicKey, formatHex(semaphoreIdentityPK), userId],
            functionName: "createAccount",
        });

        return receipt;
    }

    static async genAccountAddress(
        publicKey: [string, string],
    ): Promise<string> {
        return await getFactoryContract().getAccountAddress(publicKey);
    }

    static async getPublicKey(userId: string): Promise<[string, string]> {
        return await getFactoryContract().getPublicKey(userId);
    }
}
