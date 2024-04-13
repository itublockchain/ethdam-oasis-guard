import { Identity } from "@semaphore-protocol/identity";
import { ethers, type ContractReceipt } from "ethers";

import { formatHex } from "~utils";
import {
    AccountFactoryABI,
    Address,
    getFactoryContract,
    getGaslessProxyContract,
    SAPPHIRE_PROVIDER,
} from "~web3";

export class OasisGuardFactoryController {
    static async genCreateAccount(
        publicKey: [string, string],
        userId: string,
    ): Promise<ContractReceipt> {
        const { privateKey: semaphoreIdentityPK } = new Identity();
        const accountFactoryInterface = new ethers.utils.Interface(
            AccountFactoryABI,
        );
        const calldata = accountFactoryInterface.encodeFunctionData(
            "createAccount",
            [publicKey, formatHex(semaphoreIdentityPK), userId],
        );

        const accountCreationCalldata =
            await getGaslessProxyContract().makeProxyTx(
                Address.FACTORY,
                calldata,
                10_000_000,
            );

        const tx = await SAPPHIRE_PROVIDER.sendTransaction(
            accountCreationCalldata,
        );
        const receipt = await tx.wait();

        console.log(receipt);
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
