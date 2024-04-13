import { Identity } from "@semaphore-protocol/identity";
import type { ContractReceipt } from "ethers";

import { formatHex } from "~utils";
import { getFactoryContract } from "~web3";

export class OasisGuardFactoryController {
    static async genCreateAccount(
        publicKey: [string, string],
    ): Promise<ContractReceipt> {
        const { privateKey: semaphoreIdentityPK } = new Identity();
        const tx = await getFactoryContract(semaphoreIdentityPK).createAccount(
            publicKey,
            formatHex(semaphoreIdentityPK),
        );
        const receipt: ContractReceipt = await tx.wait();
        return receipt;
    }

    static async genAccountAddress(
        publicKey: [string, string],
    ): Promise<string> {
        return await getFactoryContract().getAccountAddress(publicKey);
    }
}
