import { Identity } from "@semaphore-protocol/identity";
import { ethers } from "ethers";

import {
    AccountABI,
    Address,
    getGaslessProxyContract,
    SAPPHIRE_PROVIDER,
    SemaphoreABI,
} from "~web3";

const provider = SAPPHIRE_PROVIDER;

const accountFactory = new ethers.Contract(
    Address.FACTORY,
    AccountABI,
    provider,
);

const semaphore = new ethers.Contract(
    Address.SEMAPHORE,
    SemaphoreABI,
    provider,
);

const semaphoreVerifier = new ethers.Contract(
    Address.SEMAPHORE_VERIFIER,
    SemaphoreABI,
    provider,
);

const readOnlyAccountFactory = accountFactory.connect(provider);
const gaslessProxy = async (calldata: string, address: string) => {
    const accountCreationCalldata = await getGaslessProxyContract().makeProxyTx(
        address,
        calldata,
        10_000_000,
    );

    const tx = await SAPPHIRE_PROVIDER.sendTransaction(accountCreationCalldata);
    const receipt = await tx.wait();

    console.log(receipt);
    return receipt;
};

export const getAccountDetails = async (
    signedHash: string,
    signature: string,
    id: string,
) => {
    const publicKey = readOnlyAccountFactory.interface.encodeFunctionResult(
        "getPublicKey",
        [id],
    );
    const accountAddress =
        readOnlyAccountFactory.interface.encodeFunctionResult(
            "getAccountAddress",
            [publicKey],
        );

    const account = new ethers.Contract(accountAddress, AccountABI, provider);
    const readOnlyAccount = account.connect(provider);

    const privateKey = readOnlyAccount.interface.encodeFunctionResult(
        "getPrivateKey",
        [Address.VALIDATOR, signedHash, signature],
    );
    return { publicKey, accountAddress, privateKey };
};

export const createGroup = async (privateKey: string) => {
    const { publicKey, commitment } = new Identity(privateKey);
    const writeSemaphore = semaphore.attach(publicKey.toString());
    const encodedData = writeSemaphore.interface.encodeFunctionData(
        "createGroup",
        [commitment],
    );
    gaslessProxy(encodedData);
};
