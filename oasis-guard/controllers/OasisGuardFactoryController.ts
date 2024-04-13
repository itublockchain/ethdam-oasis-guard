import { Identity } from "@semaphore-protocol/identity";
import type { ContractReceipt } from "ethers";

import { FactoryContract } from "~web3";

export class OasisGuardFactoryController {
    static async genCreateAccount(
        publicKey: [string, string],
    ): Promise<ContractReceipt> {
        const tx = await FactoryContract.createAccount(publicKey);
        const receipt: ContractReceipt = await tx.wait();
        return receipt;
    }

    static async genAccountAddress(
        publicKey: [string, string],
    ): Promise<string> {
        return await FactoryContract.getAccountAddress(publicKey);
    }
}
